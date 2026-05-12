import { X } from "lucide-react";
import Avatar from "./Avatar.jsx";

export default function DeepWorkBar({ task, onCancel }) {
  const elapsed = Math.max(0, Math.floor((Date.now() - task.startedAt) / 1000));
  return (
    <main className="deep-work">
      <div className="flex h-12 items-center gap-3 px-4">
        <Avatar state={task.progress >= 100 ? "speaking" : "thinking"} size="small" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{task.taskName}</p>
          <p className="truncate text-xs text-emerald-100/70">{task.log[task.log.length - 1]}</p>
        </div>
        <span className="text-xs text-emerald-100/70">{elapsed}s</span>
        <span className="w-10 text-right text-xs font-semibold">{task.progress}%</span>
        <button className="icon-button" onClick={onCancel} aria-label="Cancel task">
          <X size={16} />
        </button>
      </div>
      <div className="h-1 bg-white/10">
        <div className="h-full bg-ninja-accent transition-all duration-500" style={{ width: `${task.progress}%` }} />
      </div>
    </main>
  );
}

