import { X } from "lucide-react";
import Avatar from "./Avatar.jsx";
import ChatFeed from "./ChatFeed.jsx";
import InputBar from "./InputBar.jsx";
import QuickActions from "./QuickActions.jsx";

export default function ActivePanel({
  messages,
  busy,
  avatarState,
  statusText,
  providerStatus,
  onSend,
  onClose,
  onTranscript,
  onDeepWork
}) {
  return (
    <main className="active-panel">
      <section className="relative flex h-[200px] flex-col items-center justify-center border-b border-white/10">
        <button className="icon-button absolute right-3 top-3" onClick={onClose} aria-label="Close NINJA">
          <X size={18} />
        </button>
        <Avatar state={avatarState} />
        <h1 className="mt-3 text-lg font-semibold">NINJA</h1>
        <p className="text-sm text-emerald-100/70">{statusText}</p>
      </section>

      <section className="border-b border-white/10 px-4 py-3 text-xs text-emerald-100/70">
        <div className="flex justify-between">
          <span>Brain</span>
          <span>{providerStatus.llm || "checking"}</span>
        </div>
        <div className="mt-1 flex justify-between">
          <span>Voice</span>
          <span>{providerStatus.elevenLabs || "checking"}</span>
        </div>
        <div className="mt-1 flex justify-between">
          <span>Wake word</span>
          <span>{providerStatus.wakeword || "checking"}</span>
        </div>
      </section>

      <ChatFeed messages={messages} />
      <QuickActions onSend={onSend} onDeepWork={onDeepWork} />
      <InputBar busy={busy} onSend={onSend} onTranscript={onTranscript} />
    </main>
  );
}
