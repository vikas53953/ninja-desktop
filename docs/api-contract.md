# NINJA IPC Contract

Gate: G2 + G4 API Contract
Status: PASS
Date: 2026-05-13

## `ninja:get-state`
Request: none

Response:
```json
{
  "mode": "ambient",
  "providerStatus": {
    "llm": "opencode_configured",
    "elevenLabs": "missing_key",
    "wakeword": "disabled"
  }
}
```

## `ninja:set-mode`
Request:
```json
{ "mode": "ambient" }
```

Response:
```json
{ "ok": true, "mode": "ambient" }
```

Validation:
- `mode` must be `ambient`, `active`, or `deep-work`.

## `ninja:send-message`
Request:
```json
{ "message": "What can you do?" }
```

Response:
```json
{
  "ok": true,
  "reply": "Haan bhai...",
  "usedProvider": "opencode",
  "model": "kimi-k2.5"
}
```

Error:
```json
{ "ok": false, "error": "Message is required." }
```

## `ninja:transcribe-audio`
Request:
```json
{ "audioBuffer": "ArrayBuffer", "mimeType": "audio/webm" }
```

Response:
```json
{ "ok": true, "text": "Hey NINJA" }
```

Error:
```json
{ "ok": false, "error": "OpenAI API key is not configured." }
```

## `ninja:speak`
Request:
```json
{ "text": "Haan bhai?" }
```

Response:
```json
{ "ok": true, "audioDataUrl": "data:audio/mpeg;base64,..." }
```

Error:
```json
{ "ok": false, "error": "ElevenLabs voice is not configured." }
```

## `ninja:tool`
Request:
```json
{ "toolName": "read_memory", "params": {} }
```

Response:
```json
{
  "ok": true,
  "toolName": "read_memory",
  "tier": "GREEN",
  "status": "executed",
  "data": {}
}
```

RED action response before approval:
```json
{
  "ok": false,
  "toolName": "run_shell_command",
  "tier": "RED",
  "status": "needs_confirmation",
  "confirmationId": "confirm_abc"
}
```
