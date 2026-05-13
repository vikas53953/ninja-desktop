# NINJA Desktop

NINJA is a Windows 11 Electron desktop assistant for Vikas. Phase 1 includes the ambient widget, active chat panel, tray, Alt+N hotkey, memory files, OpenCode/Whisper/ElevenLabs plumbing, tool registry, conscience layer, morning notification scheduler, and deep-work UI.

## Prerequisites
- Node.js 20+ LTS or newer
- npm
- Windows 11 for desktop smoke testing

## Setup
```powershell
npm install
Copy-Item .env.example .env
```

Then edit `.env` and add keys as available:
- `LLM_PROVIDER=opencode`, `OPENCODE_API_KEY`, `OPENCODE_MODEL=kimi-k2.5`, and `OPENCODE_BASE_URL=https://opencode.ai/zen/go/v1` for the brain
- `OPENAI_API_KEY` only if you want Whisper voice transcription through OpenAI
- `ELEVEN_LABS_API_KEY` and `ELEVEN_LABS_VOICE_ID` for speech output
- `PORCUPINE_ACCESS_KEY` for future wake-word activation
- `NINJA_WAKEWORD_KEYWORD_PATH` for the Picovoice Console `.ppn` file for "Hey NINJA"

## Run
```powershell
npm run dev
```

Alt+N toggles the active panel. The tray menu also opens NINJA, returns to ambient mode, and starts a deep-work demo.
Packaged Windows builds enable startup through Electron `app.setLoginItemSettings()`. Dev mode does not change Windows startup unless `NINJA_ALLOW_DEV_STARTUP=true` is set.

The dev renderer binds to `http://127.0.0.1:5187` because port 5173 was already occupied on this Windows machine during SHIP verification.

## Verify
```powershell
npm test
npm run build
npm run smoke:secrets
npm audit --audit-level=high
```

## Memory
NINJA creates and reads:

```text
%USERPROFILE%\.ninja\SOUL.md
%USERPROFILE%\.ninja\NINJA-BRAIN.md
```

## Browser Tool
`open_browser` uses Playwright in headless Chromium mode to open HTTP(S) URLs and return page title plus a text preview. If Chromium is not present on a fresh machine, run:

```powershell
npx playwright install chromium
```

## Phase 1 Current Status
| Feature | Current status |
|---|---|
| Electron shell | Built and smoke-tested with `npm run dev` on port 5187. |
| System tray | Built with open, ambient, deep-work demo, startup toggle, and quit actions. |
| Ambient widget | Built with topmost enforcement; final pass still needs manual desktop app-switch verification. |
| Alt+N hotkey | Wired through Electron `globalShortcut`. |
| Wake word | Real Porcupine/PvRecorder runtime is wired. Exact "Hey NINJA" requires a Picovoice Windows `.ppn` file in `NINJA_WAKEWORD_KEYWORD_PATH`; fallback keyword is `COMPUTER`. |
| Voice input | Whisper wrapper is wired; full voice-input pass requires an STT provider key and an audio sample for `npm run smoke:voice`. |
| Voice output | ElevenLabs wrapper is wired and live-smoked from local `.env`; desktop playback still needs manual app smoke. |
| Brain | Wired through OpenCode Go by default using `kimi-k2.5`; OpenAI remains optional fallback code only. |
| Memory | Reads and updates `%USERPROFILE%\.ninja\NINJA-BRAIN.md`. |
| Tool registry | Includes memory, web search, browser, file read/write, shell command guard, notifications, screenshot, and speak. |
| Screenshot tool | Uses Electron `desktopCapturer` and saves PNG files under `%USERPROFILE%\.ninja\screenshots`. |
| Browser tool | Uses Playwright headless Chromium to return URL, title, and text preview for HTTP(S) pages. |
| Conscience layer | GREEN/YELLOW/RED checks are unit-tested; RED shell commands require confirmation. |
| Autonomous loop | 7 AM IST morning brief and 10 PM IST CISSP notification schedules are implemented and testable with `NINJA_CRON_TEST=true`. |
| Deep work mode | UI and tray-triggered demo are built; final pass still needs manual desktop verification. |
| Windows startup | Packaged builds use Electron `app.setLoginItemSettings()` with tray enable/disable toggle; final pass requires installed-package verification in Windows Startup. |
