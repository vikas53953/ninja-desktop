# NINJA Requirements

Gate: G1 Requirements
Status: PASS
Date: 2026-05-13

## Functional Requirements
1. Electron app starts on Windows 11 and shows an ambient widget.
2. System tray menu provides open, ambient, deep work demo, and quit actions.
3. Alt+N toggles between ambient widget and active panel.
4. Active panel supports typed messages and displays chat history.
5. Mic button records voice input and sends audio to Whisper when `OPENAI_API_KEY` is configured.
6. LLM brain loads `~/.ninja/SOUL.md` and `~/.ninja/NINJA-BRAIN.md` before responding, using OpenCode Go by default when `OPENCODE_API_KEY` is configured.
7. ElevenLabs TTS speaks NINJA responses when `ELEVEN_LABS_API_KEY` and `ELEVEN_LABS_VOICE_ID` are configured.
8. Core tools exist for memory, web search, file read/write, notification, screenshot stub, browser-open stub, shell command, and speak.
9. Conscience layer allows GREEN actions, executes YELLOW actions with notification, and blocks RED actions until confirmation.
10. Deep work mode shows top bar, elapsed timer, progress, cancel action, and task log.
11. Autonomous loop schedules a 7:00 AM IST brief notification.
12. Wake-word service attempts Porcupine startup only when configured and reports honest disabled state otherwise.

## Non-Functional Requirements
- API keys must be loaded from `.env` only.
- No secret values may be bundled into renderer source.
- Ambient mode should stay lightweight and avoid polling-heavy behavior.
- User-facing fallback states must clearly say when provider keys or native integrations are missing.
- App should build with `npm run build` on Windows.

## Acceptance Criteria
- Ambient widget: done when `npm run dev` opens a frameless widget with NINJA label and animated avatar.
- Hotkey: done when `Alt+N` toggles app mode through Electron `globalShortcut`.
- Chat: done when typed message produces either a real configured-LLM response or an honest missing-key fallback.
- Voice: done when mic recording can send audio to the main process and Whisper is called when a key exists.
- Memory: done when `~/.ninja/SOUL.md` and `~/.ninja/NINJA-BRAIN.md` are created if missing and read during chat.
- Conscience: done when `run_shell_command` returns a confirmation-required result until explicitly allowed.
- Morning brief: done when scheduler computes next 7:00 AM IST and can trigger a Windows notification.

## Edge Cases
- Missing `.env`: app starts with honest provider-disabled states.
- Missing microphone permission: renderer shows a friendly recording error.
- Empty text message: send button does nothing and no blank chat item is added.
- LLM request failure: chat shows a friendly error without stack traces.
- Memory file missing: default file is created.
- RED action requested by a tool: execution is blocked pending confirmation.

## Sample Test Data
- Text chat: "What can you do?", "Bhai summarize my morning", "Use my memory to greet me".
- Tool requests: read memory, send notification, blocked shell command.
- Deep work tasks: "Draft RCA", "Research BTC movement", "Prepare CISSP quiz".
