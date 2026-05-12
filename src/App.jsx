import { useEffect, useMemo, useState } from "react";
import AmbientWidget from "./components/AmbientWidget.jsx";
import ActivePanel from "./components/ActivePanel.jsx";
import DeepWorkBar from "./components/DeepWorkBar.jsx";

const initialMessages = [
  {
    id: "hello",
    role: "assistant",
    content: "Haan bhai. NINJA is awake.",
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [mode, setMode] = useState("ambient");
  const [providerStatus, setProviderStatus] = useState({});
  const [messages, setMessages] = useState(initialMessages);
  const [busy, setBusy] = useState(false);
  const [avatarState, setAvatarState] = useState("idle");
  const [deepWork, setDeepWork] = useState(null);

  useEffect(() => {
    window.ninja.getState().then((state) => {
      setMode(state.mode);
      setProviderStatus(state.providerStatus || {});
    });
    const offMode = window.ninja.onModeChanged((payload) => {
      setMode(payload.mode);
      setProviderStatus(payload.providerStatus || {});
    });
    const offDeep = window.ninja.onDeepWorkDemo(() => startDeepWorkDemo());
    return () => {
      offMode();
      offDeep();
    };
  }, []);

  const statusText = useMemo(() => {
    if (busy) return "thinking";
    if (avatarState === "listening") return "listening";
    if (avatarState === "speaking") return "speaking";
    return providerStatus.openai === "configured" ? "ready" : "setup needed";
  }, [avatarState, busy, providerStatus.openai]);

  async function changeMode(nextMode) {
    const result = await window.ninja.setMode(nextMode);
    if (result.ok) setMode(result.mode);
  }

  async function sendMessage(text) {
    const clean = text.trim();
    if (!clean || busy) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: clean,
      createdAt: new Date().toISOString()
    };
    setMessages((current) => [...current, userMessage]);
    setBusy(true);
    setAvatarState("thinking");

    const result = await window.ninja.sendMessage(clean);
    const reply = result.ok ? result.reply : `NINJA hit an error: ${result.error}`;
    const assistantMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: reply,
      createdAt: new Date().toISOString()
    };
    setMessages((current) => [...current, assistantMessage]);
    setBusy(false);

    setAvatarState("speaking");
    const speech = await window.ninja.speak(reply);
    if (speech.ok && speech.audioDataUrl) {
      const audio = new Audio(speech.audioDataUrl);
      audio.onended = () => setAvatarState("idle");
      audio.onerror = () => setAvatarState("idle");
      audio.play().catch(() => setAvatarState("idle"));
    } else {
      setTimeout(() => setAvatarState("idle"), 900);
    }
  }

  async function handleTranscript(audioBuffer, mimeType) {
    setAvatarState("listening");
    const result = await window.ninja.transcribeAudio(audioBuffer, mimeType);
    setAvatarState("idle");
    if (result.ok && result.text) {
      await sendMessage(result.text);
    } else {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: result.error || "NINJA could not hear that clearly.",
          createdAt: new Date().toISOString()
        }
      ]);
    }
  }

  async function startDeepWorkDemo() {
    const startedAt = Date.now();
    setMode("deep-work");
    await window.ninja.setMode("deep-work");
    setDeepWork({
      taskName: "Phase 1 desktop smoke",
      startedAt,
      progress: 8,
      log: ["Starting desktop task", "Checking app shell"]
    });

    const steps = [
      [35, "Validating active panel"],
      [62, "Checking tool guardrails"],
      [84, "Preparing completion note"],
      [100, "Done"]
    ];
    steps.forEach(([progress, line], index) => {
      setTimeout(() => {
        setDeepWork((current) =>
          current ? { ...current, progress, log: [...current.log, line] } : current
        );
      }, 1100 * (index + 1));
    });
  }

  if (mode === "deep-work" && deepWork) {
    return <DeepWorkBar task={deepWork} onCancel={() => changeMode("active")} />;
  }

  if (mode === "active") {
    return (
      <ActivePanel
        messages={messages}
        busy={busy}
        avatarState={avatarState}
        statusText={statusText}
        providerStatus={providerStatus}
        onSend={sendMessage}
        onClose={() => changeMode("ambient")}
        onTranscript={handleTranscript}
        onDeepWork={startDeepWorkDemo}
      />
    );
  }

  return <AmbientWidget statusText={statusText} avatarState={avatarState} onOpen={() => changeMode("active")} />;
}
