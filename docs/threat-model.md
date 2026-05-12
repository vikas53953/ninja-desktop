# NINJA Threat Model

Gate: G5 Security & Privacy
Status: PASS
Date: 2026-05-13

## Attack Surfaces
- Renderer text and voice input.
- IPC messages from renderer to main.
- External API calls to OpenAI, ElevenLabs, Brave/Bing, and optional Porcupine.
- File tools that can read/write local files.
- Shell command tool.

## Secret Handling
- API keys live in `.env` only.
- `.env` is ignored by git.
- Renderer code receives only provider status, never secret values.
- External provider calls run in Electron main/services only.

## IPC Validation
Main process validates IPC payload shape before executing actions. Unknown modes, empty messages, and unknown tools return friendly errors.

## Conscience Guardrails
- GREEN tools execute directly.
- YELLOW tools execute and notify Vikas.
- RED tools return `needs_confirmation` unless explicit approval is supplied.

## Error Privacy
User-visible errors should not expose stack traces, local secret values, or raw provider responses.

## Local Exposure
Phase 1 has no public HTTP server. Vite is development-only and local.

## Security Checks
Milestone verification must run:

```powershell
npm audit --audit-level=high
Select-String -Path src\**\* -Pattern "sk-|OPENAI_API_KEY|ELEVEN_LABS_API_KEY" -SimpleMatch
```

