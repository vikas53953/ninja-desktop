# NINJA Phase 1 Milestones

Gate: G6 Build Milestones
Status: PARTIAL
Date: 2026-05-13

## M1: Desktop Shell And Ambient Control
Acceptance:
- Electron app starts.
- Ambient widget renders bottom-right.
- Tray menu exists.
- Alt+N toggles active panel.
- Build command passes.

Smoke:
```powershell
npm install
npm run build
npm test
npm run smoke:secrets
```

Result: PASS. Electron starts, renderer builds, tray/hotkey code is wired, and ambient/active/deep-work views exist.

## M2: Brain, Memory, Voice Plumbing
Acceptance:
- Memory files are created/read.
- Typed chat reaches brain service.
- Missing API keys produce honest fallback.
- Whisper and ElevenLabs wrappers are callable when keys exist.

Result: PARTIAL LIVE PASS. Service wrappers and IPC are implemented. OpenCode Go and ElevenLabs were live-smoked from local `.env`; Whisper STT still needs an audio sample and STT key for full voice input.

## M3: Tool Registry And Conscience
Acceptance:
- GREEN tool executes.
- YELLOW tool executes and notifies.
- RED tool blocks pending confirmation.

Result: PASS. Unit tests prove GREEN execution, YELLOW notification path, RED confirmation requirement, and RED execution with explicit confirmation.

## M4: Active Panel Completion
Acceptance:
- Chat feed, quick actions, input, mic, avatar states work.
- Error/loading/empty states are visible.

Result: PASS. Chat feed, quick actions, input bar, mic capture path, avatar states, and provider status UI are implemented.

## M5: Wake Word And Autonomous Loop
Acceptance:
- Porcupine startup is attempted only with key/dependency.
- Disabled wake-word state is honest.
- 7:00 AM IST notification scheduler is active.

Result: PARTIAL. Morning scheduler is implemented and unit-tested. Wake-word adapter is honest-disabled until Porcupine key/binding/custom keyword setup exists.

## M6: Deep Work Mode
Acceptance:
- Top bar shows task name, elapsed time, progress, and cancel.
- Completion returns to active panel.

Result: PASS. Deep-work top bar and demo task are implemented with progress, elapsed time, log, and cancel action.

## M7: Release Readiness
Acceptance:
- README and release docs match reality.
- Security greps and audit have no high/critical findings or are documented.
- SHIP report is complete.

Result: PARTIAL. README, docs, checks, and report exist. OpenCode/ElevenLabs live smoke is complete; full STT voice input, native wake-word verification, and manual desktop checks remain environment-dependent.
