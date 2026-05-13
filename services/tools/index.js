const { execFile } = require("child_process");
const { promisify } = require("util");
const { conscienceCheck } = require("../conscience");
const { readMemory, appendMemory } = require("../memory");
const { readFile, writeFile } = require("./filesystem");
const { sendNotification } = require("./notifications");
const { webSearch } = require("./webSearch");
const { openBrowser } = require("./browser");
const { takeScreenshot } = require("./screenshot");
const { synthesizeSpeech } = require("../voice");
const { appendToolLog } = require("../toolLog");

const execFileAsync = promisify(execFile);

async function runShellCommand(params = {}) {
  const command = String(params.command || "").trim();
  if (!command) return { error: "Command is required." };
  const result = await execFileAsync("powershell.exe", ["-NoProfile", "-Command", command], {
    timeout: Number(params.timeoutMs || 15000),
    windowsHide: true
  });
  return { stdout: result.stdout, stderr: result.stderr };
}

const TOOL_EXECUTORS = {
  read_memory: () => readMemory(),
  write_memory: (params) => appendMemory(params && params.note),
  web_search: webSearch,
  open_browser: openBrowser,
  read_file: readFile,
  write_file: writeFile,
  run_shell_command: runShellCommand,
  send_notification: sendNotification,
  take_screenshot: takeScreenshot,
  speak: (params) => synthesizeSpeech(params && params.text)
};

async function executeTool(toolName, params = {}, context = {}) {
  const startedAt = Date.now();
  const executor = TOOL_EXECUTORS[toolName];
  if (!executor) {
    const result = { ok: false, toolName, status: "failed", error: "Unknown tool." };
    appendToolLog({ toolName, params, result, durationMs: Date.now() - startedAt });
    return result;
  }
  try {
    const result = await conscienceCheck(toolName, params, () => executor(params, context), context);
    appendToolLog({ toolName, params, result, durationMs: Date.now() - startedAt });
    return result;
  } catch (_error) {
    const result = { ok: false, toolName, status: "failed", error: "Tool execution failed." };
    appendToolLog({ toolName, params, result, durationMs: Date.now() - startedAt });
    return result;
  }
}

module.exports = { TOOL_EXECUTORS, executeTool };
