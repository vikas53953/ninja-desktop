const TOOL_CONSCIENCE_MAP = {
  read_memory: "GREEN",
  write_memory: "GREEN",
  web_search: "GREEN",
  open_browser: "GREEN",
  read_file: "GREEN",
  write_file: "YELLOW",
  run_shell_command: "RED",
  send_notification: "GREEN",
  take_screenshot: "GREEN",
  speak: "GREEN"
};

async function conscienceCheck(toolName, params, executor, context = {}) {
  const tier = TOOL_CONSCIENCE_MAP[toolName];
  if (!tier) {
    return { ok: false, toolName, status: "failed", error: "Unknown tool." };
  }

  if (tier === "RED" && !context.confirmation) {
    if (context.confirm) {
      const allowed = await context.confirm(`NINJA wants to run ${toolName}\nParams: ${JSON.stringify(params || {})}`);
      if (!allowed) {
        return { ok: false, toolName, tier, status: "blocked", error: "Blocked by conscience layer." };
      }
    } else {
      return {
        ok: false,
        toolName,
        tier,
        status: "needs_confirmation",
        confirmationId: `confirm_${Date.now()}`
      };
    }
  }

  const data = await executor();
  if (tier === "YELLOW" && context.notify) {
    context.notify("NINJA action completed", `${toolName} executed.`);
  }
  return { ok: true, toolName, tier, status: "executed", data };
}

module.exports = { TOOL_CONSCIENCE_MAP, conscienceCheck };

