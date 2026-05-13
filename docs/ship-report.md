# SHIP Report v3.0

App: NINJA Desktop
Version: 0.1.0
Date: 2026-05-13
Framework: SHIP Autopilot v3.0 by pylabmit

## Gate Scorecard
| Gate | Status | Evidence |
|---|---|---|
| G0 Idea & Value | PASS | `docs/discovery.md` |
| G1 Requirements | PASS | `docs/requirements.md` |
| G2 Architecture | PASS | `docs/architecture.md`, `docs/api-contract.md` |
| G3 UX / Interaction | PASS | `docs/ux-spec.md` |
| G4 Data & API | PASS | `docs/data-plan.md`, `docs/api-contract.md` |
| G5 Security & Privacy | PASS | `docs/threat-model.md` |
| G6 Build Milestones | PARTIAL | M1-M4 and M6 pass; M5 wake-word native path partial |
| G7 Test Strategy | PASS | `npm test`, build, secret smoke, audit, renderer smoke, Electron smoke |
| G8 Release Readiness | PARTIAL | runnable scaffold passes; live provider/wake-word verification pending keys/native setup |
| G9 Customer Acceptance | PARTIAL | `docs/acceptance-test.md` |
| G10 Operations | PARTIAL | `docs/ops-runbook.md` |
| G11 Post-Ship Review | PARTIAL | `docs/post-ship-review.md` pending |

## Honest Assessment
Genuinely works: Electron/React scaffold, ambient/active/deep-work UI, tray/hotkey wiring, packaged Windows startup registration code with tray toggle, memory files, NINJA-LOG tool execution logging, GPT/voice wrappers, tool registry, conscience layer, 7 AM IST morning scheduler, 10 PM IST CISSP scheduler, tests, build, secret smoke, audit, renderer smoke, Electron start smoke, and `npm run dev` smoke on port 5187.

Mock/fallback: GPT-4o, Whisper, and ElevenLabs return honest missing-key/provider errors until `.env` has valid keys. Wake word uses real Porcupine wiring when configured, but exact "Hey NINJA" needs a Picovoice Console Windows `.ppn`; otherwise the built-in fallback keyword is `COMPUTER`.

Needs fixing: live provider-key voice verification via `npm run smoke:voice`, manual always-on-top desktop app-switch smoke, visible Alt+N/manual desktop smoke, and native Porcupine "Hey NINJA" `.ppn` verification.

API status: OpenAI/ElevenLabs/Brave/Bing not live-verified because no API keys were provided in this repo.

## Ship Decision
SHIP WITH KNOWN ISSUES for local scaffold testing. DO NOT claim full Phase 1 voice/wake-word completion until provider keys and Porcupine native setup are verified.
