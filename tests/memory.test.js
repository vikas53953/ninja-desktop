const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { ensureMemoryFiles, readMemory, appendMemory } = require("../services/memory");

test("memory files are created with default content", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ninja-memory-"));
  const paths = ensureMemoryFiles(dir);

  assert.equal(fs.existsSync(paths.soulPath), true);
  assert.equal(fs.existsSync(paths.brainPath), true);
  const memory = readMemory(dir);
  assert.match(memory.soul, /You are NINJA/);
  assert.match(memory.brain, /# NINJA BRAIN/);
});

test("appendMemory writes a dated note", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ninja-memory-"));
  const result = appendMemory("test note", dir);
  assert.equal(result.ok, true);
  const brain = fs.readFileSync(result.brainPath, "utf8");
  assert.match(brain, /test note/);
});

