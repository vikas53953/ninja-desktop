const fs = require("fs");
const path = require("path");

const roots = ["src"];
const patterns = [/sk-[A-Za-z0-9_-]+/, /OPENAI_API_KEY\s*=/, /ELEVEN_LABS_API_KEY\s*=/];
let failed = false;

function scan(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  for (const pattern of patterns) {
    if (pattern.test(content)) {
      console.error(`Secret-like pattern found in ${filePath}: ${pattern}`);
      failed = true;
    }
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    if (entry.isFile() && /\.(js|jsx|css|html)$/.test(entry.name)) scan(fullPath);
  }
}

for (const root of roots) walk(path.join(process.cwd(), root));

if (failed) process.exit(1);
console.log("Secret smoke passed: renderer source is clean.");

