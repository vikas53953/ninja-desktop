const fs = require("fs");
const path = require("path");
const { NINJA_DIR } = require("../memory");

function timestampFileName(date = new Date()) {
  return `${date.toISOString().replace(/[:.]/g, "-")}.png`;
}

async function takeScreenshot() {
  const electron = require("electron");
  const { desktopCapturer, screen } = electron;

  if (!desktopCapturer || !screen) {
    return { ok: false, error: "Electron desktop capture APIs are unavailable in this process." };
  }

  try {
    const display = screen.getPrimaryDisplay();
    const { width, height } = display.size;
    const sources = await desktopCapturer.getSources({
      types: ["screen"],
      thumbnailSize: { width, height }
    });

    const primarySource = sources[0];
    if (!primarySource || primarySource.thumbnail.isEmpty()) {
      return { ok: false, error: "No screen source was available for capture." };
    }

    const screenshotsDir = path.join(NINJA_DIR, "screenshots");
    fs.mkdirSync(screenshotsDir, { recursive: true });
    const filePath = path.join(screenshotsDir, timestampFileName());
    fs.writeFileSync(filePath, primarySource.thumbnail.toPNG());
    return { ok: true, path: filePath, width, height };
  } catch (_error) {
    return { ok: false, error: "Screenshot capture failed. Check Windows screen-capture permissions." };
  }
}

module.exports = { takeScreenshot, timestampFileName };
