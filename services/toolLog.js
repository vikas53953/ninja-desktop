const fs = require("fs");
const path = require("path");
const { NINJA_DIR } = require("./memory");

const MAX_LOG_ENTRIES = 500;

function redactValue(value) {
  if (typeof value === "string") {
    if (/key|token|secret|password/i.test(value)) return "[redacted]";
    if (value.length > 500) return `${value.slice(0, 500)}...`;
  }
  if (Array.isArray(value)) return value.map(redactValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        /key|token|secret|password/i.test(key) ? "[redacted]" : redactValue(item)
      ])
    );
  }
  return value;
}

function summarizeResult(result) {
  if (!result) return "No result";
  if (result.error) return `failure: ${result.error}`;
  if (result.status) return `${result.ok ? "success" : "failure"}: ${result.status}`;
  return result.ok === false ? "failure" : "success";
}

function trimLog(content) {
  const parts = content.split(/\n(?=## \d{4}-\d{2}-\d{2}T)/g).filter(Boolean);
  return parts.slice(-MAX_LOG_ENTRIES).join("\n");
}

function appendToolLog({ toolName, params, result, durationMs }, baseDir = NINJA_DIR) {
  fs.mkdirSync(baseDir, { recursive: true });
  const logPath = path.join(baseDir, "NINJA-LOG.md");
  const existing = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf8") : "# NINJA LOG\n";
  const entry = [
    `## ${new Date().toISOString()}`,
    `Tool: ${toolName || "unknown"}`,
    `Input: ${JSON.stringify(redactValue(params || {}))}`,
    `Result: ${summarizeResult(result)}`,
    `Duration: ${durationMs}ms`,
    ""
  ].join("\n");
  fs.writeFileSync(logPath, trimLog(`${existing.trim()}\n\n${entry}`), "utf8");
  return { logPath };
}

module.exports = {
  MAX_LOG_ENTRIES,
  appendToolLog,
  redactValue,
  summarizeResult,
  trimLog
};
