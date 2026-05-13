# NINJA Voice Pipeline Test Log

Date: 2026-05-13
Status: BLOCKED FOR LIVE PASS

## Current Environment
| Provider | Key Present | Result |
|---|---:|---|
| OpenAI GPT-4o / Whisper | No verified key in repo | Live test skipped |
| ElevenLabs | No verified key in repo | Live test skipped |
| Audio sample | No `NINJA_VOICE_TEST_AUDIO` path configured | Whisper sample skipped |

No secret values are stored in this repository. Add keys to local `.env` only.

## Repeatable Test Command
```powershell
$env:NINJA_VOICE_TEST_AUDIO="C:\path\to\short-question.wav"
npm run smoke:voice
```

## Pass Criteria
- Whisper transcription returns `ok: true`.
- GPT-4o response returns `ok: true`.
- ElevenLabs TTS returns `ok: true` with an audio data URL.
- Total measured latency from end of speech to audio availability is under `3000ms`.

## Latest Result
Live roundtrip is not claimed yet. The code path is wired, but the real pass requires local `.env` provider keys plus a short audio sample.
