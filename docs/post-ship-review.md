# NINJA Post-Ship Review

Gate: G11 Post-Ship Review
Status: PARTIAL
Date: 2026-05-13

## What Worked
- SHIP G0-G5 docs were created before source.
- Dependency audit was repaired to zero vulnerabilities by upgrading Electron, Vite, and electron-builder.
- Unit tests, production build, secret smoke, renderer HTTP smoke, and Electron start smoke passed.

## What Failed Or Needed Adjustment
- Initial `npm install` timed out but completed on retry.
- Port 5173 was already in use, so the first renderer smoke was not trusted; an alternate port smoke was used.
- Vite 8 made the old React Babel plugin noisy, so the config was simplified to use Vite's native JSX build path.

## Known Defects / Limits
- Wake-word native streaming is not fully verified.
- OpenCode Go and ElevenLabs calls are live-smoked from local `.env`; Whisper STT still needs an audio sample and STT key.
- Visual desktop interaction still needs a manual pass by Vikas.

## Next Backlog
- Add a real Porcupine custom keyword asset path.
- Add an interactive desktop smoke script if feasible.
- Add persistent chat history if Vikas wants conversation replay.
