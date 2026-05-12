const test = require("node:test");
const assert = require("node:assert/strict");
const { conscienceCheck } = require("../services/conscience");

test("GREEN tools execute immediately", async () => {
  const result = await conscienceCheck("read_memory", {}, async () => ({ value: 1 }));
  assert.equal(result.ok, true);
  assert.equal(result.tier, "GREEN");
  assert.equal(result.status, "executed");
});

test("YELLOW tools execute and notify", async () => {
  let notified = false;
  const result = await conscienceCheck("write_file", {}, async () => ({ value: 1 }), {
    notify: () => {
      notified = true;
    }
  });
  assert.equal(result.ok, true);
  assert.equal(result.tier, "YELLOW");
  assert.equal(notified, true);
});

test("RED tools require confirmation", async () => {
  const result = await conscienceCheck("run_shell_command", { command: "whoami" }, async () => ({ value: 1 }));
  assert.equal(result.ok, false);
  assert.equal(result.tier, "RED");
  assert.equal(result.status, "needs_confirmation");
});

test("RED tools execute with explicit confirmation", async () => {
  const result = await conscienceCheck("run_shell_command", { command: "whoami" }, async () => ({ value: 1 }), {
    confirmation: true
  });
  assert.equal(result.ok, true);
  assert.equal(result.tier, "RED");
  assert.equal(result.status, "executed");
});

