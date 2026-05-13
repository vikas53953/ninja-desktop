const test = require("node:test");
const assert = require("node:assert/strict");
const { startWakeWord } = require("../services/wakeword");

test("wake word disables cleanly when Picovoice key is missing", async () => {
  const previousKey = process.env.PORCUPINE_ACCESS_KEY;
  delete process.env.PORCUPINE_ACCESS_KEY;

  const result = await startWakeWord(() => {});
  assert.equal(result.status, "disabled");
  assert.match(result.reason, /PORCUPINE_ACCESS_KEY/);
  assert.equal(typeof result.stop, "function");

  if (previousKey) process.env.PORCUPINE_ACCESS_KEY = previousKey;
});
