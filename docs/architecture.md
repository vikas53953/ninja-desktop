# NINJA Architecture

Gate: G2 Architecture
Status: PASS
Date: 2026-05-13

## Tech Stack
| Layer | Technology | Reason |
|---|---|---|
| Desktop | Electron 31 | Windows desktop shell, tray, global shortcut |
| Renderer | React 18 + Vite | Fast local UI development |
| Styling | Tailwind CSS | Matches spec and quick desktop UI iteration |
| Icons | lucide-react | SHIP rule: icons, no Unicode symbol buttons |
| Brain | OpenCode Go chat completions using `kimi-k2.5` | User-selected Phase 1 brain provider |
| STT | OpenAI Whisper API | Spec-required voice input |
| TTS | ElevenLabs API | Spec-required Vikas voice output |
| Wake word | Optional Porcupine adapter | Loaded only when dependency/key exists |
| Persistence | Markdown files under `~/.ninja` | Spec-required memory format |

## Folder Structure
```text
ninja-desktop/
  package.json
  .env.example
  electron/
    main.js
    preload.js
    tray.js
  src/
    App.jsx
    components/
    styles/
  services/
    brain.js
    memory.js
    voice.js
    wakeword.js
    conscience.js
    autonomousLoop.js
    tools/
  soul/
    SOUL.md
    NINJA-BRAIN.md
  assets/
    icon.svg
  tests/
```

## API Contract
There is no separate HTTP backend in Phase 1. Renderer-to-main communication uses Electron IPC.

Detailed IPC contracts are in `docs/api-contract.md`.

## Data Schema
Phase 1 stores markdown files, not a database.

```text
~/.ninja/SOUL.md
~/.ninja/NINJA-BRAIN.md
```

## Type Shapes
```js
ChatMessage = {
  id: string,
  role: "user" | "assistant" | "system",
  content: string,
  createdAt: string
}

ToolResult = {
  ok: boolean,
  toolName: string,
  tier: "GREEN" | "YELLOW" | "RED",
  status: "executed" | "blocked" | "needs_confirmation" | "failed",
  data?: unknown,
  error?: string
}
```

## Environment Variables
See `.env.example`.

## Deployment Target
Local Windows 11 desktop. Development runs through Vite plus Electron. Production packaging is planned through `electron-builder`.

## Architecture Risks
- Porcupine native bindings may need extra Windows build dependencies.
- Real full voice flow requires valid OpenCode, STT, and ElevenLabs keys plus an audio sample.
- Browser/system screenshot tooling may need additional OS permissions.
- A single Electron process means provider calls must never block UI state updates.
