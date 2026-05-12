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

## 2026-05-13 Honest Limitations
- GPT-4o, Whisper, and ElevenLabs calls are implemented but require valid `.env` keys for live provider verification.
- Wake-word service reports disabled unless `PORCUPINE_ACCESS_KEY` and the native Porcupine binding are configured; custom "Hey NINJA" keyword streaming still needs the final native keyword/device pass.
- Screenshot tool returns an honest unsupported result in this scaffold until native desktop capture is implemented.
