const test = require("node:test");
const assert = require("node:assert/strict");
const { msUntilNextIstHour } = require("../services/autonomousLoop");

test("morning brief scheduler returns a positive delay", () => {
  const delay = msUntilNextIstHour(7);
  assert.equal(delay > 0, true);
  assert.equal(delay <= 24 * 60 * 60 * 1000, true);
});

