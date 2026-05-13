const test = require("node:test");
const assert = require("node:assert/strict");
const { createTray } = require("../electron/tray");

test("tray factory is exported for startup toggle wiring", () => {
  assert.equal(typeof createTray, "function");
});
