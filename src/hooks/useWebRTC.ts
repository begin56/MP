// Uses STUN and optional TURN. Signaling URL: NEXT_PUBLIC_SIGNALING_URL or ws://localhost:3001

import { useCallback, useEffect, useRef, useState } from "react"

type Signal =
  | { type: "join"; roomId: string }
  | { type: "offer"; roomId: string; sdp: RTCSessionDescriptionInit }
  | { type: "answer"; roomId: string; sdp: RTCSessionDescriptionInit }
  | { type: "ice"; roomId: string; candidate: RTCIceCandidateInit }
  | { type: "leave"; roomId: string }

export function useWebRTC() {
  const [state, setState] = useState<"idle" | "connecting" | "connected">("idle")
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)

  const pcRef = useRef<RTCPeerConnection | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const roomRef = useRef<string>("")

  const ensurePC = useCallback(() => {
    if (pcRef.current) return pcRef.current
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        // Add your TURN server if needed for NAT traversal:
        // { urls: 'turn:your.turn.server:3478', username: 'user', credential: 'pass' },
      ],
    })
    pc.onicecandidate = (e) => {
      if (e.candidate && wsRef.current && roomRef.current) {
        const msg: Signal = { type: "ice", roomId: roomRef.current, candidate: e.candidate.toJSON() }
        wsRef.current.send(JSON.stringify(msg))
      }
    }
    pc.ontrack = (e) => {
      const [stream] = e.streams
      setRemoteStream(stream)
    }
    pcRef.current = pc
    return pc
  }, [])

  const closePC = useCallback(() => {
    pcRef.current?.getSenders().forEach((s) => {
      try {
        s.track?.stop()
      } catch {
        console.log('error')
      }
    })
    pcRef.current?.close()
    pcRef.current = null
  }, [])

  const connectWS = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return wsRef.current
    const url =  "ws://localhost:3001"
    // process.env.NEXT_PUBLIC_SIGNALING_URL as string) ||
    const ws = new WebSocket(url)
    wsRef.current = ws
    return ws
  }, [])

  const join = useCallback(
    async (roomId: string) => {
      roomRef.current = roomId
      setState("connecting")

      const ws = connectWS()
      await new Promise<void>((resolve, reject) => {
        if (ws.readyState === WebSocket.OPEN) return resolve()
        ws.onopen = () => resolve()
        ws.onerror = () => reject(new Error("WebSocket error"))
      })

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      setLocalStream(stream)

      const pc = ensurePC()
      stream.getTracks().forEach((t) => pc.addTrack(t, stream))

      ws.onmessage = async (ev) => {
        const data = JSON.parse(ev.data) as Signal
        if (!pcRef.current) return
        if (!data || data.roomId !== roomRef.current) return

        switch (data.type) {
          case "offer": {
            await pcRef.current.setRemoteDescription(new RTCSessionDescription(data.sdp))
            const answer = await pcRef.current.createAnswer()
            await pcRef.current.setLocalDescription(answer)
            ws.send(JSON.stringify({ type: "answer", roomId: roomRef.current, sdp: answer } satisfies Signal))
            setState("connected")
            break
          }
          case "answer": {
            await pcRef.current.setRemoteDescription(new RTCSessionDescription(data.sdp))
            setState("connected")
            break
          }
          case "ice": {
            try {
              await pcRef.current.addIceCandidate(new RTCIceCandidate(data.candidate))
            } catch {
                console.log('errored')
            }
            break
          }
          case "leave": {
            leave()
            break
          }
        }
      }

      // Join the room; first joiner becomes caller and creates the offer
      ws.send(JSON.stringify({ type: "join", roomId } satisfies Signal))

      // Small delay to see if someone else is here. If not receiving an offer, be the caller.
      setTimeout(async () => {
        if (state !== "connected" && pcRef.current) {
          const offer = await pcRef.current.createOffer()
          await pcRef.current.setLocalDescription(offer)
          ws.send(JSON.stringify({ type: "offer", roomId, sdp: offer } satisfies Signal))
        }
      }, 350)
    },
    [connectWS, ensurePC],
  )

  const leave = useCallback(() => {
    wsRef.current?.send(JSON.stringify({ type: "leave", roomId: roomRef.current } satisfies Signal))
    wsRef.current?.close()
    wsRef.current = null
    closePC()
    setLocalStream(null)
    setRemoteStream(null)
    setState("idle")
  }, [closePC])

  useEffect(() => {
    return () => {
      leave()
    }
  }, [leave])

  return { localStream, remoteStream, join, leave, state }
}
