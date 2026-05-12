const fs = require("fs");
const path = require("path");
const os = require("os");

function resolveUserPath(inputPath) {
  const raw = String(inputPath || "").trim();
  if (!raw) throw new Error("Path is required.");
  if (raw.startsWith("~")) return path.join(os.homedir(), raw.slice(1));
  return path.resolve(raw);
}

function readFile(params = {}) {
  const target = resolveUserPath(params.path);
  return { path: target, content: fs.readFileSync(target, "utf8") };
}

function writeFile(params = {}) {
  const target = resolveUserPath(params.path);
  const content = String(params.content || "");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, "utf8");
  return { path: target, bytes: Buffer.byteLength(content, "utf8") };
}

module.exports = { readFile, writeFile, resolveUserPath };

