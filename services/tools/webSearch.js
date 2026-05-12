async function webSearch(params = {}) {
  const query = String(params.query || "").trim();
  if (!query) return { results: [], note: "Query is required." };

  if (process.env.BRAVE_SEARCH_API_KEY) {
    const response = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}`, {
      headers: { "X-Subscription-Token": process.env.BRAVE_SEARCH_API_KEY }
    });
    if (!response.ok) return { results: [], error: `Brave search failed with status ${response.status}.` };
    const data = await response.json();
    return { results: (data.web && data.web.results ? data.web.results : []).slice(0, 5) };
  }

  if (process.env.BING_SEARCH_API_KEY) {
    const response = await fetch(`https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}`, {
      headers: { "Ocp-Apim-Subscription-Key": process.env.BING_SEARCH_API_KEY }
    });
    if (!response.ok) return { results: [], error: `Bing search failed with status ${response.status}.` };
    const data = await response.json();
    return { results: (data.webPages && data.webPages.value ? data.webPages.value : []).slice(0, 5) };
  }

  return { results: [], note: "No web search API key configured." };
}

module.exports = { webSearch };

