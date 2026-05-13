function normalizeHttpUrl(rawUrl) {
  const url = String(rawUrl || "").trim();
  if (!/^https?:\/\//.test(url)) throw new Error("A valid http(s) URL is required.");
  return url;
}

async function openBrowser(params = {}) {
  let browser;
  try {
    const url = normalizeHttpUrl(params.url);
    const { chromium } = require("playwright");
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: Number(params.timeoutMs || 15000) });
    const title = await page.title();
    const text = await page.locator("body").innerText({ timeout: 5000 }).catch(() => "");
    return {
      ok: true,
      url: page.url(),
      title,
      textPreview: text.replace(/\s+/g, " ").trim().slice(0, 1200)
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error && /Executable doesn't exist|browserType\.launch/i.test(error.message)
          ? "Playwright browser is not installed. Run `npx playwright install chromium`."
          : error.message || "Browser tool failed."
    };
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { normalizeHttpUrl, openBrowser };
