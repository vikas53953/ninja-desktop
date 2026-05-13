const test = require("node:test");
const assert = require("node:assert/strict");
const { missingLlmResponse, providerConfig } = require("../services/brain");

test("missing LLM fallback returns honest provider status", () => {
  const result = missingLlmResponse("hello", {
    provider: "opencode",
    model: "kimi-k2.5",
    missingKeyName: "OPENCODE_API_KEY"
  });
  assert.equal(result.ok, true);
  assert.equal(result.usedProvider, "fallback");
  assert.match(result.reply, /OPENCODE_API_KEY/);
});

test("OpenCode provider config appends chat completions endpoint", () => {
  const previousProvider = process.env.LLM_PROVIDER;
  const previousBase = process.env.OPENCODE_BASE_URL;
  process.env.LLM_PROVIDER = "opencode";
  process.env.OPENCODE_BASE_URL = "https://opencode.ai/zen/go/v1";
  const config = providerConfig();
  assert.equal(config.endpoint, "https://opencode.ai/zen/go/v1/chat/completions");
  assert.equal(config.model, process.env.OPENCODE_MODEL || "kimi-k2.5");
  if (previousProvider === undefined) delete process.env.LLM_PROVIDER;
  else process.env.LLM_PROVIDER = previousProvider;
  if (previousBase === undefined) delete process.env.OPENCODE_BASE_URL;
  else process.env.OPENCODE_BASE_URL = previousBase;
});
