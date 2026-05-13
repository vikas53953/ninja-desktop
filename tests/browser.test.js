const test = require("node:test");
const assert = require("node:assert/strict");
const { normalizeHttpUrl } = require("../services/tools/browser");

test("browser tool accepts http and https URLs", () => {
  assert.equal(normalizeHttpUrl("https://example.com"), "https://example.com");
  assert.equal(normalizeHttpUrl(" http://localhost:5187 "), "http://localhost:5187");
});

test("browser tool rejects non-http URLs", () => {
  assert.throws(() => normalizeHttpUrl("file:///tmp/a.html"), /valid http/);
  assert.throws(() => normalizeHttpUrl("javascript:alert(1)"), /valid http/);
});
