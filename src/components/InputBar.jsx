import { Mic, Send, Square } from "lucide-react";
import { useRef, useState } from "react";

export default function InputBar({ busy, onSend, onTranscript }) {
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  function submit(event) {
    event.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  }

  async function toggleRecording() {
    if (recording && recorderRef.current) {
      recorderRef.current.stop();
      setRecording(false);
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream);
    recorderRef.current = recorder;
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.onstop = async () => {
      stream.getTracks().forEach((track) => track.stop());
      const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
      const buffer = await blob.arrayBuffer();
      await onTranscript(buffer, blob.type);
    };
    recorder.start();
    setRecording(true);
  }

  return (
    <form className="input-bar" onSubmit={submit}>
      <button type="button" className={`icon-button ${recording ? "recording" : ""}`} onClick={toggleRecording} aria-label="Record voice">
        {recording ? <Square size={18} /> : <Mic size={18} />}
      </button>
      <input
        aria-label="Message NINJA"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={recording ? "listening..." : "Message NINJA"}
        disabled={busy}
      />
      <button type="submit" className="icon-button primary" disabled={busy || !text.trim()} aria-label="Send message">
        <Send size={18} />
      </button>
    </form>
  );
}

