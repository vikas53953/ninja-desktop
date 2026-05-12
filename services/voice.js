function getExtension(mimeType) {
  if (mimeType && mimeType.includes("mp4")) return "mp4";
  if (mimeType && mimeType.includes("wav")) return "wav";
  return "webm";
}

async function transcribeAudio(audioBuffer, mimeType = "audio/webm") {
  if (!process.env.OPENAI_API_KEY) {
    return { ok: false, error: "OpenAI API key is not configured." };
  }

  try {
    const form = new FormData();
    const blob = new Blob([audioBuffer], { type: mimeType });
    form.append("file", blob, `ninja-audio.${getExtension(mimeType)}`);
    form.append("model", "whisper-1");

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: form
    });

    if (!response.ok) return { ok: false, error: `Whisper request failed with status ${response.status}.` };
    const data = await response.json();
    return { ok: true, text: data.text || "" };
  } catch (_error) {
    return { ok: false, error: "NINJA could not transcribe audio right now." };
  }
}

async function synthesizeSpeech(text) {
  if (!process.env.ELEVEN_LABS_API_KEY || !process.env.ELEVEN_LABS_VOICE_ID) {
    return { ok: false, error: "ElevenLabs voice is not configured." };
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVEN_LABS_VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVEN_LABS_API_KEY,
          "Content-Type": "application/json",
          Accept: "audio/mpeg"
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.45, similarity_boost: 0.8 }
        })
      }
    );

    if (!response.ok) return { ok: false, error: `ElevenLabs request failed with status ${response.status}.` };
    const audio = Buffer.from(await response.arrayBuffer());
    return { ok: true, audioDataUrl: `data:audio/mpeg;base64,${audio.toString("base64")}` };
  } catch (_error) {
    return { ok: false, error: "NINJA could not synthesize speech right now." };
  }
}

module.exports = { transcribeAudio, synthesizeSpeech };

