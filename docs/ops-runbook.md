# NINJA Ops Runbook

Gate: G10 Operations
Status: PASS
Date: 2026-05-13

## Start
```powershell
npm install
npm run dev
```

NINJA uses port 5187 for the Vite renderer because port 5173 was already in use during local verification.

```powershell
npx vite --host 127.0.0.1 --port 5187 --strictPort
```

## Logs
Development logs appear in the terminal running Electron.

## Memory Files
```text
%USERPROFILE%\.ninja\SOUL.md
%USERPROFILE%\.ninja\NINJA-BRAIN.md
```

## Backup
```powershell
Copy-Item "$env:USERPROFILE\.ninja\NINJA-BRAIN.md" "$env:USERPROFILE\.ninja\NINJA-BRAIN.md.bak"
```

## Troubleshooting
| Symptom | Likely Cause | Fix |
|---|---|---|
| App will not start | Missing dependencies | Run `npm install` |
| Blank app window | Vite dev server not ready | Restart `npm run dev` |
| No GPT response | Missing OpenAI key | Add `OPENAI_API_KEY` to `.env` |
| No voice output | Missing ElevenLabs settings | Add `ELEVEN_LABS_API_KEY` and `ELEVEN_LABS_VOICE_ID` |
| Wake word disabled | Missing Porcupine key/dependency | Configure `PORCUPINE_ACCESS_KEY` and install binding |
| RED tool blocked | Conscience layer working | Approve explicitly only when safe |
