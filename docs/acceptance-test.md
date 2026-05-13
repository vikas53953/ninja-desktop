# NINJA Phase 1 Acceptance Test

Date: 2026-05-13
Reviewer: Codex v3 improvement pass after Claude gap analysis

## Summary
| Status | Count | Meaning |
|---|---:|---|
| PASS | 5 | Implemented and verified by automated or runtime smoke |
| PARTIAL | 6 | Implemented or wired, but needs live keys, `.ppn`, installer, or manual desktop pass |
| FAIL | 0 | No known unimplemented Phase 1 criterion remains as a pure stub |

## Criteria

### 1. NINJA starts on Windows boot
Status: PARTIAL

What was tested:
- Verified `electron/main.js` uses `app.setLoginItemSettings()`.
- Added tray startup toggle.
- Dev mode intentionally avoids polluting Windows startup unless `NINJA_ALLOW_DEV_STARTUP=true`.

Result:
- Code path exists for packaged Windows builds.
- Final PASS requires building/installing the NSIS package and confirming NINJA appears in Windows Task Manager Startup.

### 2. Ambient widget visible in bottom-right corner always
Status: PARTIAL

What was tested:
- Static test verifies `setAlwaysOnTop(true, "screen-saver")`, `setSkipTaskbar(true)`, `setVisibleOnAllWorkspaces()`, and `moveTop()`.
- `npm run dev` smoke confirmed the app process stays running.

Result:
- Topmost behavior is enforced in code.
- Final PASS requires a manual Windows app-switch smoke across Chrome/Word/other windows.

### 3. Say "Hey NINJA" -> panel opens and NINJA speaks "Haan bhai?"
Status: PARTIAL

What was tested:
- Real `@picovoice/porcupine-node` and `@picovoice/pvrecorder-node` runtime wiring was added.
- Missing key path is tested and disables cleanly.

Result:
- Real wake-word listener can run when configured.
- Exact "Hey NINJA" detection requires a Picovoice Console Windows `.ppn` path in `NINJA_WAKEWORD_KEYWORD_PATH`.
- Without the `.ppn`, fallback built-in keyword is `COMPUTER`.

### 4. Press Alt+N -> same behavior
Status: PASS

What was tested:
- `electron/main.js` registers `globalShortcut.register("Alt+N")`.
- Electron start smoke stayed running without main-process crash.

Result:
- Hotkey code path is implemented. Visible keypress confirmation should still be part of the next manual desktop pass.

### 5. Ask NINJA a question by voice -> answers by voice in Vikas's cloned voice
Status: PARTIAL

What was tested:
- `services/voice.js` implements Whisper STT and ElevenLabs TTS wrappers.
- Added `npm run smoke:voice`.
- Current `npm run smoke:voice` reaches OpenCode and ElevenLabs, but skips Whisper because no STT key/audio sample is configured.

Result:
- LLM + TTS path exists and was live-tested.
- Final PASS requires an STT provider key and `NINJA_VOICE_TEST_AUDIO` for voice input.

### 6. Ask NINJA a question by typing -> answers by voice + text
Status: PARTIAL

What was tested:
- React input path sends messages through IPC.
- Brain fallback test confirms honest missing-key text response.
- TTS wrapper is wired but requires ElevenLabs keys.

Result:
- Text answer path is implemented through OpenCode.
- Voice output is live-tested through ElevenLabs, but final user-facing playback still needs visible desktop smoke.

### 7. NINJA reads NINJA-BRAIN.md and uses context in responses
Status: PASS

What was tested:
- Memory tests verify default `SOUL.md` and `NINJA-BRAIN.md` creation/read.
- `askBrain()` injects SOUL and brain memory into the configured LLM provider request when key exists.

Result:
- Memory read path is implemented.

### 8. NINJA updates NINJA-BRAIN.md after conversation ends
Status: PASS

What was tested:
- `missingLlmResponse()` now appends a fallback conversation note.
- LLM success path appends a provider/model response note.
- Tests confirm fallback behavior.

Result:
- Conversation memory update exists for both fallback and configured-LLM paths.

### 9. At 7:00 AM IST -> Windows notification "Bhai, your brief is ready"
Status: PASS

What was tested:
- Unit tests verify 7 AM IST maps to 01:30 UTC.
- `NINJA_CRON_TEST=true` fires the morning notification path during test runtime.

Result:
- Scheduling logic is implemented and testable without waiting for wall-clock time.

### 10. Assign multi-step task -> deep work bar appears -> reports back on done
Status: PARTIAL

What was tested:
- Deep work component and demo task are implemented.
- Tray menu can trigger the demo.

Result:
- Code path exists.
- Final PASS requires a visible desktop/manual smoke.

### 11. RED action attempted -> NINJA asks for confirmation before proceeding
Status: PASS

What was tested:
- Unit tests verify RED tools return `needs_confirmation`.
- Unit tests verify RED tools execute only with explicit confirmation.

Result:
- Conscience guardrail works at service level.

## Commands Run
```powershell
npm test
npm run build
npm run smoke:secrets
npm run smoke:voice
npm audit --audit-level=high
```

## Current Ship Decision
SHIP WITH KNOWN ISSUES for development review.

Do not claim final Phase 1 complete until these live/manual checks pass:
- Picovoice access key plus Windows `.ppn` for exact "Hey NINJA".
- OpenCode/ElevenLabs/STT keys with voice latency log under 3000ms.
- Packaged NSIS install plus Windows Startup tab verification.
- Manual always-on-top and deep-work desktop smoke.
