const test = require("node:test");
const assert = require("node:assert/strict");
const { msUntilNextUtcTime, msUntilNextIstHour, startAutonomousLoop } = require("../services/autonomousLoop");

test("morning brief scheduler returns a positive delay", () => {
  const delay = msUntilNextIstHour(7);
  assert.equal(delay > 0, true);
  assert.equal(delay <= 24 * 60 * 60 * 1000, true);
});

test("7 AM IST maps to 01:30 UTC", () => {
  const delay = msUntilNextIstHour(7, new Date("2026-05-13T01:29:00.000Z"));
  assert.equal(delay, 60 * 1000);
});

test("10 PM IST maps to 16:30 UTC", () => {
  const delay = msUntilNextUtcTime(16, 30, new Date("2026-05-13T16:29:00.000Z"));
  assert.equal(delay, 60 * 1000);
});

test("cron test mode fires both notifications", async () => {
  const previous = process.env.NINJA_CRON_TEST;
  process.env.NINJA_CRON_TEST = "true";
  const messages = [];
  const loop = startAutonomousLoop({ notify: (_title, body) => messages.push(body) });
  await new Promise((resolve) => setTimeout(resolve, 700));
  loop.stop();
  assert.deepEqual(messages, ["Bhai, your brief is ready", "Bhai, time for CISSP practice"]);
  if (previous === undefined) delete process.env.NINJA_CRON_TEST;
  else process.env.NINJA_CRON_TEST = previous;
});
