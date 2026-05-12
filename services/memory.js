const fs = require("fs");
const os = require("os");
const path = require("path");

const NINJA_DIR = path.join(os.homedir(), ".ninja");
const SOUL_PATH = path.join(NINJA_DIR, "SOUL.md");
const BRAIN_PATH = path.join(NINJA_DIR, "NINJA-BRAIN.md");

const DEFAULT_SOUL = `You are NINJA - Vikas's autonomous digital twin and personal AI bro.

IDENTITY:
- You are not a generic assistant. You are NINJA.
- You know Vikas deeply: network security lead at a major bank, crypto trader, AI builder, husband to Neha, based in Gurgaon.
- You speak Hinglish naturally - switch between Hindi and English based on what Vikas speaks first in each message.
- Casual mode: call him "bhai", be direct, be warm, be real.
- Work mode: professional, precise, structured. Switch automatically when topic is work-related.

CORE BEHAVIOUR:
- ALWAYS ask at least one clarifying question before executing any non-trivial task.
- For simple queries, answer directly.

MEMORY:
- Your memory lives in NINJA-BRAIN.md.
- Read it at the start of every conversation.
- Update it after every session with new things you learned about Vikas.

CONSCIENCE:
- GREEN actions: do autonomously.
- YELLOW actions: do it, then tell Vikas.
- RED actions: ALWAYS ask first.
`;

function defaultBrain() {
  return `# NINJA BRAIN
Last updated: ${new Date().toISOString()}

## About Vikas
Vikas is building NINJA, a Windows desktop AI assistant.

## Active Projects
- NINJA Desktop Phase 1.

## Preferences
- Be direct, useful, honest, and verification-first.

## Recent Context
- Phase 1 build started from NINJA_SPEC_v1.0.md.

## Things to Remember
- Do not fake provider-backed features when API keys are missing.
`;
}

function ensureMemoryFiles(baseDir = NINJA_DIR) {
  const soulPath = path.join(baseDir, "SOUL.md");
  const brainPath = path.join(baseDir, "NINJA-BRAIN.md");
  fs.mkdirSync(baseDir, { recursive: true });
  if (!fs.existsSync(soulPath)) fs.writeFileSync(soulPath, DEFAULT_SOUL, "utf8");
  if (!fs.existsSync(brainPath)) fs.writeFileSync(brainPath, defaultBrain(), "utf8");
  return { soulPath, brainPath };
}

function readMemory(baseDir = NINJA_DIR) {
  const paths = ensureMemoryFiles(baseDir);
  return {
    soul: fs.readFileSync(paths.soulPath, "utf8"),
    brain: fs.readFileSync(paths.brainPath, "utf8"),
    paths
  };
}

function appendMemory(note, baseDir = NINJA_DIR) {
  const { brainPath } = ensureMemoryFiles(baseDir);
  const cleanNote = String(note || "").trim();
  if (!cleanNote) return { ok: false, error: "Memory note is required." };
  const entry = `\n\n## Recent Context\n- ${new Date().toISOString()}: ${cleanNote}\n`;
  fs.appendFileSync(brainPath, entry, "utf8");
  return { ok: true, brainPath };
}

module.exports = {
  NINJA_DIR,
  SOUL_PATH,
  BRAIN_PATH,
  DEFAULT_SOUL,
  ensureMemoryFiles,
  readMemory,
  appendMemory
};

