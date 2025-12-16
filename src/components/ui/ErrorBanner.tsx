
export default function ErrorBanner({
  message,
  onClose,
}: {
  message: string
  onClose?: () => void
}) {
  return (
    <div
      role="alert"
      className="flex items-center justify-between gap-3 border-b bg-destructive px-3 py-2 text-destructive-foreground"
    >
      <div className="flex items-center gap-2">
        <span aria-hidden className="inline-block size-2 rounded-full bg-destructive-foreground/80" />
        <p className="text-sm">{message}</p>
      </div>
      <button
        className="rounded border border-destructive-foreground/20 px-2 py-1 text-xs hover:bg-destructive-foreground/10"
        onClick={onClose}
        aria-label="Dismiss error"
      >
        Dismiss
      </button>
    </div>
  )
}
