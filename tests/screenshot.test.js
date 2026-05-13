const test = require("node:test");
const assert = require("node:assert/strict");
const { timestampFileName } = require("../services/tools/screenshot");

test("screenshot timestamp filename is Windows-safe PNG", () => {
  const name = timestampFileName(new Date("2026-05-13T01:02:03.004Z"));
  assert.equal(name, "2026-05-13T01-02-03-004Z.png");
});
