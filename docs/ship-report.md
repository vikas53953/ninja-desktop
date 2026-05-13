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
| G8 Release Readiness | PARTIAL | runnable scaffold and v3 fixes pass; live provider/wake-word/installer/manual checks pending |
| G9 Customer Acceptance | PARTIAL | all 11 criteria documented in `docs/acceptance-test.md`; 5 pass, 6 partial |
| G10 Operations | PARTIAL | `docs/ops-runbook.md` |
| G11 Post-Ship Review | PARTIAL | `docs/post-ship-review.md` pending |

## Honest Assessment
Genuinely works: Electron/React scaffold, ambient/active/deep-work UI, tray/hotkey wiring, packaged Windows startup registration code with tray toggle, memory files, NINJA-LOG tool execution logging, OpenCode Go/Kimi K2.5 brain, ElevenLabs TTS wrapper with live smoke, Playwright-backed `open_browser` with live Example Domain smoke, tool registry, conscience layer, 7 AM IST morning scheduler, 10 PM IST CISSP scheduler, tests, build, secret smoke, audit, renderer smoke, Electron start smoke, and `npm run dev` smoke on port 5187.

Mock/fallback: OpenCode is now the configured brain provider through local `.env`. Whisper STT still returns honest missing-key/provider errors until an STT key and audio sample are configured. Wake word uses real Porcupine wiring when configured, but exact "Hey NINJA" needs a Picovoice Console Windows `.ppn`; otherwise the built-in fallback keyword is `COMPUTER`.

Needs fixing: full voice-input roundtrip verification with STT audio sample, manual always-on-top desktop app-switch smoke, visible Alt+N/manual desktop smoke, and native Porcupine "Hey NINJA" `.ppn` verification.

API status: OpenCode Go and ElevenLabs were live-verified from local `.env`. OpenAI Whisper STT, Brave, and Bing are not live-verified.

## Ship Decision
SHIP WITH KNOWN ISSUES for development review. DO NOT claim final Phase 1 complete until provider keys, exact Porcupine `.ppn`, packaged startup, and manual desktop smoke are verified.
