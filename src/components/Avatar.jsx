export default function Avatar({ state = "idle", size = "large" }) {
  const isSmall = size === "small";
  return (
    <div className={`avatar-shell ${state} ${isSmall ? "h-10 w-10" : "h-28 w-28"}`} aria-label={`NINJA ${state}`}>
      <div className="avatar-face">
        <span className="avatar-eye left" />
        <span className="avatar-eye right" />
        <span className="avatar-mouth" />
      </div>
    </div>
  );
}

