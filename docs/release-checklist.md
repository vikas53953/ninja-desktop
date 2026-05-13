# NINJA Release Checklist

Gate: G8 Release Readiness
Status: PARTIAL
Date: 2026-05-13

- [x] README is complete and accurate for the current scaffold.
- [x] `.env.example` exists.
- [x] `npm install` succeeds.
- [x] `npm run build` succeeds.
- [x] `npm test` succeeds.
- [x] `npm audit --audit-level=high` has no unresolved high/critical findings.
- [x] Known limitations are documented honestly.
- [x] Windows desktop smoke completed with `npm start`.
- [x] `npm run dev` smoke completed on port 5187.
- [x] Claude gap analysis response documented.
- [x] Acceptance test document covers all 11 Phase 1 criteria.
- [x] Live OpenCode Go brain verification completed with real key from local `.env`.
- [x] Live ElevenLabs TTS verification completed with real key from local `.env`.
- [ ] Live Whisper/STT verification completed with real audio sample.
- [ ] Native Porcupine "Hey NINJA" verification completed.
- [ ] Packaged installer startup verification completed.
- [ ] Manual always-on-top desktop verification completed.
