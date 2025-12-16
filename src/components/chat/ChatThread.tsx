import { useParams } from "react-router-dom"
import { useEffect, useMemo, useRef, useState } from "react"

type Message = {
  id: string
  author: "me" | "them"
  text?: string
  imageUrl?: string
  time: string
}

const demoMsgs: Message[] = [
  {
    id: "m1",
    author: "them",
    text: "baucraprouwaco-2006@yopmail.com",
    time: "Fri, Aug 29",
  },
  {
    id: "m2",
    author: "them",
    text: "student",
    time: "Fri, Aug 29",
  },
  {
    id: "m3",
    author: "them",
    text: "16a87264-05cb-42e7-8c32-e06d4b7874d7",
    time: "Fri, Aug 29",
  },
  {
    id: "m4",
    author: "me",
    text: "web socket, payment integration, react query, notification, stripe api",
    time: "Mon, Sep 22",
  },
]

export default function ChatThread() {
  const { threadId } = useParams<{ threadId: string }>()
  const [messages, setMessages] = useState<Message[]>(demoMsgs)
  const [draft, setDraft] = useState("")
  const scrollerRef = useRef<HTMLDivElement>(null)

  const title = useMemo(() => (threadId ? threadId.replace(/-/g, " ") : "Chat"), [threadId])

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight })
  }, [messages.length])

  function send() {
    if (!draft.trim()) return
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), author: "me", text: draft.trim(), time: "now" },
    ])
    setDraft("")
  }

  return (
    <section className="flex h-[100vh] flex-col bg-[#1f1f1f] text-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-700 bg-[#252526] px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-purple-600 flex items-center justify-center font-semibold">
            {title[0]?.toUpperCase() || "C"}
          </div>
          <div>
            <h2 className="text-base font-semibold">{title}</h2>
            <p className="text-xs text-neutral-400">Chat</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-md bg-neutral-700 px-3 py-1 text-xs hover:bg-neutral-600">
            Search
          </button>
          <button className="rounded-md bg-neutral-700 px-3 py-1 text-xs hover:bg-neutral-600">
            Share
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollerRef}
        className="flex-1 space-y-4 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent"
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} m={m} />
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-neutral-700 bg-[#252526] px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message..."
            rows={1}
            className="min-h-10 w-full resize-none rounded-lg border border-neutral-600 bg-[#2d2d2d] px-3 py-2 text-sm text-white placeholder:text-neutral-400 focus:border-purple-500 focus:outline-none"
          />
          <button
            onClick={send}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  )
}

function MessageBubble({ m }: { m: Message }) {
  const isMe = m.author === "me"
  const align = isMe ? "items-end" : "items-start"
  const bubbleColor = isMe ? "bg-purple-600 text-white" : "bg-neutral-700 text-neutral-100"

  return (
    <div className={`flex flex-col ${align}`}>
      <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${bubbleColor}`}>
        {m.text && <p className="whitespace-pre-wrap">{m.text}</p>}
      </div>
      <span className="mt-1 text-[10px] text-neutral-400">{m.time}</span>
    </div>
  )
}
