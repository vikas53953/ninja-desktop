const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { appendToolLog, redactValue, trimLog } = require("../services/toolLog");

test("tool log appends execution entry", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ninja-log-"));
  const result = appendToolLog(
    {
      toolName: "read_memory",
      params: { ok: true },
      result: { ok: true, status: "executed" },
      durationMs: 12
    },
    dir
  );
  const content = fs.readFileSync(result.logPath, "utf8");
  assert.match(content, /Tool: read_memory/);
  assert.match(content, /Duration: 12ms/);
});

test("tool log redacts sensitive parameter keys", () => {
  const redacted = redactValue({ apiKey: "abc", nested: { token: "def" } });
  assert.equal(redacted.apiKey, "[redacted]");
  assert.equal(redacted.nested.token, "[redacted]");
});

test("tool log trims old entries", () => {
  const content = Array.from({ length: 505 }, (_, index) => `## 2026-05-13T00:00:${String(index).padStart(2, "0")}Z\nTool: t`).join("\n");
  const trimmed = trimLog(content);
  const count = trimmed.split(/\n(?=## )/g).length;
  assert.equal(count, 500);
});
