# NINJA Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first runnable NINJA Electron desktop assistant according to `NINJA_SPEC_v1.0.md` and SHIP v3 gates.

**Architecture:** Electron main owns desktop integration, secrets, provider calls, memory, tools, and safety checks. React renderer owns the ambient widget, active panel, avatar, chat UI, mic capture, and deep-work display.

**Tech Stack:** Electron, React, Vite, Tailwind CSS, lucide-react, Vitest, OpenAI API, ElevenLabs API, optional Porcupine.

---

### Task 1: SHIP Docs
**Files:**
- Create: `docs/discovery.md`
- Create: `docs/requirements.md`
- Create: `docs/architecture.md`
- Create: `docs/api-contract.md`
- Create: `docs/ux-spec.md`
- Create: `docs/data-plan.md`
- Create: `docs/threat-model.md`

- [x] Write G0-G5 docs before source.
- [ ] Review docs after M1 verification.

### Task 2: M1 Desktop Shell
**Files:**
- Create: `package.json`
- Create: `electron/main.js`
- Create: `electron/preload.js`
- Create: `electron/tray.js`
- Create: `src/App.jsx`
- Create: `src/components/AmbientWidget.jsx`
- Create: `src/components/ActivePanel.jsx`
- Create: `src/components/DeepWorkBar.jsx`

- [ ] Install dependencies with `npm install`.
- [ ] Build with `npm run build`.
- [ ] Smoke with `npm run dev`.
- [ ] Commit once M1 passes.

### Task 3: M2 Brain, Memory, Voice
**Files:**
- Create: `services/brain.js`
- Create: `services/memory.js`
- Create: `services/voice.js`
- Create: `soul/SOUL.md`
- Create: `soul/NINJA-BRAIN.md`

- [ ] Unit test memory defaults.
- [ ] Implement missing-key fallback.
- [ ] Wire text chat IPC.
- [ ] Wire mic capture and TTS IPC.

### Task 4: M3 Tools And Conscience
**Files:**
- Create: `services/conscience.js`
- Create: `services/tools/index.js`
- Create: `services/tools/filesystem.js`
- Create: `services/tools/notifications.js`
- Create: `services/tools/webSearch.js`
- Create: `services/tools/browser.js`
- Create: `services/tools/screenshot.js`

- [ ] Unit test GREEN/YELLOW/RED decisions.
- [ ] Wire renderer tool calls through IPC.
- [ ] Confirm RED command blocks without approval.

### Task 5: M4-M6 Desktop UX
**Files:**
- Modify: `src/components/*`
- Create: `services/wakeword.js`
- Create: `services/autonomousLoop.js`

- [ ] Complete avatar states.
- [ ] Complete deep-work progress.
- [ ] Implement honest wake-word status.
- [ ] Implement 7:00 AM IST notification scheduler.

### Task 6: M7 Verification
**Files:**
- Modify: `README.md`
- Modify: `docs/test-log.md`
- Modify: `docs/ship-report.md`

- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Run `npm run smoke:secrets`.
- [ ] Run `npm audit --audit-level=high`.
- [ ] Document limitations.

