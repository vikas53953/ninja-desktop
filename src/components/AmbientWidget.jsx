import Avatar from "./Avatar.jsx";

export default function AmbientWidget({ statusText, avatarState, onOpen }) {
  return (
    <button className="ambient-widget" onClick={onOpen} aria-label="Open NINJA">
      <Avatar state={avatarState} size="small" />
      <span className="font-semibold tracking-normal">NINJA</span>
      <span className="flex items-center gap-1 text-[10px] text-emerald-100/80">
        <span className="h-2 w-2 rounded-full bg-ninja-accent shadow-[0_0_12px_#1D9E75]" />
        {statusText}
      </span>
    </button>
  );
}

