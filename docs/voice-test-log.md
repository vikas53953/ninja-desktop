# NINJA Voice Pipeline Test Log

Date: 2026-05-13
Status: PARTIAL LIVE PASS

## Current Environment
| Provider | Key Present | Result |
|---|---:|---|
| OpenCode Go / Kimi K2.5 | Yes, in local `.env` only | Live LLM call succeeded |
| OpenAI Whisper STT | No verified key in repo | Live STT skipped |
| ElevenLabs | Yes, in local `.env` only | Live TTS call succeeded |
| Audio sample | No `NINJA_VOICE_TEST_AUDIO` path configured | Whisper sample skipped |

No secret values are stored in this repository. Add keys to local `.env` only.

## Repeatable Test Command
```powershell
$env:NINJA_VOICE_TEST_AUDIO="C:\path\to\short-question.wav"
npm run smoke:voice
```

## Pass Criteria
- Whisper transcription returns `ok: true`.
- OpenCode Go/Kimi response returns `ok: true`.
- ElevenLabs TTS returns `ok: true` with an audio data URL.
- Total measured latency from end of speech to audio availability is under `3000ms`.

## Latest Result
Live OpenCode and ElevenLabs calls succeeded after wiring `LLM_PROVIDER=opencode`.

Latest measured smoke:
- LLM provider: `opencode`
- Model: `kimi-k2.5`
- OpenCode LLM latency: `8997ms`
- ElevenLabs TTS latency: `838ms`
- Measured LLM + TTS total: `9835ms`
- Full voice roundtrip under 3000ms: `false`

This is not a full voice-input pass because Whisper STT was skipped. A true full roundtrip still requires a short audio sample and a configured STT provider.
