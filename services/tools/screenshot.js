function takeScreenshot() {
  return {
    ok: false,
    note: "Screenshot capture requires a native desktop permission pass and is not enabled in this Phase 1 scaffold yet."
  };
}

module.exports = { takeScreenshot };

