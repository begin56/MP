
import { useEffect, useRef, useState } from "react"
import { useWebRTC } from "../../hooks/useWebRTC"

export default function VideoRoom() {
  const [roomId, setRoomId] = useState("demo-room")
  const { localStream, remoteStream, join, leave, state } = useWebRTC()
  const localRef = useRef<HTMLVideoElement>(null)
  const remoteRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (localRef.current && localStream) {
      localRef.current.srcObject = localStream
    }
  }, [localStream])

  useEffect(() => {
    if (remoteRef.current && remoteStream) {
      remoteRef.current.srcObject = remoteStream
    }
  }, [remoteStream])

  return (
    <section className="flex h-[calc(100dvh-3rem-2.5rem)] flex-col gap-3 p-3 md:flex-row">
      <div className="flex-1 space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h2 className="mb-2 text-sm font-medium">Room</h2>
          <div className="flex flex-col gap-2 md:flex-row">
            <input
              className="rounded-md border bg-background px-3 py-2 text-sm outline-none"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="room-id"
              aria-label="Room ID"
            />
            <div className="flex gap-2">
              <button
                className="rounded-md border bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-90"
                onClick={() => join(roomId)}
              >
                Join
              </button>
              <button className="rounded-md border px-3 py-2 text-sm hover:bg-accent" onClick={leave}>
                Leave
              </button>
            </div>
          </div>
          <p className="mt-2 text-xs text-foreground/60">Status: {state}</p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-md border bg-card p-2">
            <p className="mb-1 text-xs text-foreground/60">You</p>
            <video ref={localRef} autoPlay muted playsInline className="aspect-video w-full rounded-md bg-black/40" />
          </div>
          <div className="rounded-md border bg-card p-2">
            <p className="mb-1 text-xs text-foreground/60">Remote</p>
            <video ref={remoteRef} autoPlay playsInline className="aspect-video w-full rounded-md bg-black/40" />
          </div>
        </div>
      </div>

      {/* Side info panel */}
      <aside className="w-full shrink-0 rounded-md border bg-card p-3 md:w-80">
        <h3 className="mb-2 text-sm font-medium">Tips</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/70">
          <li>Open this room in two separate browsers to test.</li>
          <li>Make sure camera and microphone permissions are granted.</li>
          <li>Update NEXT_PUBLIC_SIGNALING_URL if your signaling server runs on a different host.</li>
        </ul>
      </aside>
    </section>
  )
}
