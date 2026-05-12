# NINJA Acceptance Test

Gate: G9 Customer Acceptance
Status: PARTIAL
Date: 2026-05-13

## Core Flow Tests
1. Start NINJA with `npm run dev`.
   - Expected: ambient widget appears.
   - Actual: Electron production smoke with `npm start` stayed running without crash. Interactive visual smoke remains to be checked by Vikas.
2. Press Alt+N.
   - Expected: active panel opens or closes.
   - Actual: hotkey is registered in Electron main; interactive keyboard smoke remains to be checked in the visible desktop session.
3. Type a message.
   - Expected: NINJA answers with provider response or honest missing-key fallback.
   - Actual: IPC and fallback path are implemented; live GPT answer requires `OPENAI_API_KEY`.
4. Try RED shell command tool.
   - Expected: confirmation required.
   - Actual: PASS by unit test.
