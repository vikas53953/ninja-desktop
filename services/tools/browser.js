function openBrowser(params = {}) {
  const url = String(params.url || "").trim();
  if (!/^https?:\/\//.test(url)) return { ok: false, error: "A valid http(s) URL is required." };
  return { ok: true, url, note: "Browser automation is reserved for Phase 2; URL validated in Phase 1." };
}

module.exports = { openBrowser };

