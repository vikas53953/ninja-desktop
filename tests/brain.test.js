const test = require("node:test");
const assert = require("node:assert/strict");
const { missingOpenAiResponse } = require("../services/brain");

test("missing OpenAI fallback returns honest provider status", () => {
  const result = missingOpenAiResponse("hello");
  assert.equal(result.ok, true);
  assert.equal(result.usedProvider, "fallback");
  assert.match(result.reply, /OPENAI_API_KEY/);
});
