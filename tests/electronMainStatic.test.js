const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

test("main process enforces always-on-top desktop widget settings", () => {
  const source = fs.readFileSync(path.join(process.cwd(), "electron", "main.js"), "utf8");
  assert.match(source, /setAlwaysOnTop\(true,\s*"screen-saver"/);
  assert.match(source, /setSkipTaskbar\(true\)/);
  assert.match(source, /setVisibleOnAllWorkspaces/);
  assert.match(source, /moveTop\(\)/);
});
