# NINJA Desktop

NINJA is a Windows 11 Electron desktop assistant for Vikas. Phase 1 includes the ambient widget, active chat panel, tray, Alt+N hotkey, memory files, GPT/Whisper/ElevenLabs plumbing, tool registry, conscience layer, morning notification scheduler, and deep-work UI.

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
- `OPENAI_API_KEY` for GPT-4o and Whisper
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

## Honest Limitations
- If provider keys are missing, NINJA shows an honest fallback instead of fake GPT or voice output.
- Porcupine wake-word startup uses the real Node binding when `PORCUPINE_ACCESS_KEY` is configured. For the exact phrase "Hey NINJA", add a Picovoice Console Windows `.ppn` file path in `NINJA_WAKEWORD_KEYWORD_PATH`; otherwise the built-in fallback keyword is `COMPUTER`.
- Screenshot capture uses Electron `desktopCapturer` and saves PNG files under `%USERPROFILE%\.ninja\screenshots`.
