# NINJA Test Log

Gate: G6 + G7 Test Evidence
Status: IN PROGRESS

## 2026-05-13 Preflight
- Read `C:\Users\vikasmit\Downloads\NINJA_SPEC_v1.0.md`.
- Read SHIP Autopilot v3 framework in this workspace.
- Verified Node.js `v24.11.0`, npm `11.6.1`, git `2.52.0.windows.1`.
- Initialized git repo because the workspace had no `.git` folder.

## 2026-05-13 M1-M3 Verification
- `npm install`: PASS on retry. First run timed out during dependency installation; retry completed and produced `package-lock.json`.
- `npm audit --audit-level=high`: initially FAIL with 10 high vulnerabilities in Electron/electron-builder transitive dependencies. Ran `npm audit fix --force`, upgrading Electron to 42.0.1, Vite to 8.0.12, and electron-builder to 26.8.1. Final audit: PASS, 0 vulnerabilities.
- `npm test`: PASS, 7 tests passed covering memory defaults, memory append, morning scheduler delay, and GREEN/YELLOW/RED conscience behavior.
- `npm run build`: PASS, Vite production build generated `dist/index.html` and assets.
- `npm run smoke:secrets`: PASS, no renderer API key or `sk-` patterns found.
- Renderer smoke on port 5173: NOT TRUSTED because the port was already in use by another process.
- Renderer smoke on port 5187: PASS, `GET /` returned 200 and included `<title>NINJA</title>` plus `id="root"`. Repo dev config was moved to 5187 so `npm run dev` does not collide with the existing 5173 process.
- Electron production smoke with `npm start`: PASS, process stayed running for 10 seconds without main-process crash, then was stopped intentionally.
- Full dev smoke with `npm run dev`: PASS, Vite served `http://127.0.0.1:5187`, `GET /` returned 200 with NINJA title, and the combined Vite/Electron process stayed running until intentionally stopped.
- Startup entry behavior: implemented via Electron `app.setLoginItemSettings()` for packaged Windows builds, with tray enable/disable toggle. Dev mode intentionally reports `development_only` unless `NINJA_ALLOW_DEV_STARTUP=true`.
- Ambient always-on-top behavior: Electron window config includes `frame:false`, `transparent:true`, `skipTaskbar:true`, and topmost enforcement via `setAlwaysOnTop(true, "screen-saver", 1)`, `setVisibleOnAllWorkspaces`, and `moveTop()` on create/mode changes/ambient blur. Manual app-switch visibility still needs a human desktop pass.
- NINJA-LOG behavior: every `executeTool()` result appends a redacted entry to `%USERPROFILE%\.ninja\NINJA-LOG.md` with tool name, params, result summary, and duration; tests cover append, redaction, and 500-entry trimming.
- Voice pipeline verification: added `npm run smoke:voice` and `docs/voice-test-log.md`. Live latency PASS is blocked until local `.env` contains OpenAI/ElevenLabs keys and `NINJA_VOICE_TEST_AUDIO` points to a short audio sample.
- Autonomous loop timezone: 7 AM IST is scheduled as 01:30 UTC, 10 PM IST CISSP quiz is scheduled as 16:30 UTC, and `NINJA_CRON_TEST=true` fires both notifications within test runtime.
- Browser tool: Playwright added for `open_browser`; the tool opens an HTTP(S) URL headlessly, returns final URL, title, and body text preview. URL validation tests cover unsafe schemes. Installed Chromium with `npx playwright install chromium`; live smoke against `https://example.com` returned `ok: true`, title `Example Domain`, and non-empty text preview.
- Memory update behavior: chat fallback and GPT-4o success paths both append a conversation note to `NINJA-BRAIN.md`; fallback test confirms honest missing-key response.

## 2026-05-13 Honest Limitations
- GPT-4o, Whisper, and ElevenLabs calls are implemented but require valid `.env` keys for live provider verification.
- Wake-word service uses `@picovoice/porcupine-node` plus `@picovoice/pvrecorder-node` when configured. Exact "Hey NINJA" detection still requires a Picovoice Console Windows `.ppn` keyword file via `NINJA_WAKEWORD_KEYWORD_PATH`; without it, the fallback built-in keyword is `COMPUTER`.
- Screenshot tool uses Electron `desktopCapturer` and saves PNG files to `%USERPROFILE%\.ninja\screenshots`.
