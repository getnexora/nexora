// /api/universal-search.js
// Vercel Serverless Function
// Aggregates Google CSE + Bing Web Search and returns normalized, deduped results.

export default async function handler(req, res) {
  try {
    const q = (req.query.q || "").toString().trim();
    const count = Math.min(parseInt(req.query.count || "10", 10), 20);
    if (!q) return res.status(400).json({ error: "Missing q" });

    // Env vars set in Vercel project settings
    const GOOGLE_KEY = process.env.GOOGLE_CSE_KEY;
    const GOOGLE_CX = process.env.GOOGLE_CSE_CX;
    const BING_KEY = process.env.BING_SEARCH_KEY;

    const providers = [];

    // Google Custom Search
    if (GOOGLE_KEY && GOOGLE_CX) {
      providers.push(
        fetch(
          `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(
            q
          )}&num=${Math.min(count, 10)}`
        )
          .then((r) => r.json())
          .then((data) =>
            (data.items || []).map((i) => ({
              source: "Google",
              title: i.title || "",
              url: i.link || "",
              snippet: i.snippet || "",
              displayUrl: i.link || "",
              date: i.pagemap?.metatags?.[0]?.["article:published_time"] || null,
            }))
          )
          .catch(() => [])
      );
    }

    // Bing Web Search
    if (BING_KEY) {
      providers.push(
        fetch(
          `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(
            q
          )}&count=${count}`,
          { headers: { "Ocp-Apim-Subscription-Key": BING_KEY } }
        )
          .then((r) => r.json())
          .then((data) =>
            (data.webPages?.value || []).map((i) => ({
              source: "Bing",
              title: i.name || "",
              url: i.url || "",
              snippet: i.snippet || "",
              displayUrl: i.displayUrl || i.url || "",
              date: i.dateLastCrawled || null,
            }))
          )
          .catch(() => [])
      );
    }

    // (Optional) Add more providers later:
    // - DuckDuckGo Instant Answer API (limited web results)
    // - Brave Search API
    // - Yandex, Baidu (regional)

    const resultsArrays = await Promise.all(providers);
    const merged = resultsArrays.flat();

    // Local site results (page-level index you control from the client)
    // The client will send them to combine + boost site pages.
    let local = [];
    try {
      const localParam = req.query.local ? JSON.parse(req.query.local) : [];
      local = Array.isArray(localParam) ? localParam : [];
    } catch {
      local = [];
    }
    const localMapped = local.map((i) => ({
      source: "Site",
      title: i.title || "",
      url: i.url || "",
      snippet: i.snippet || "",
      displayUrl: i.url || "",
      date: null,
    }));

    // Merge provider + local
    const all = [...localMapped, ...merged];

    // Deduplicate by normalized URL
    const seen = new Set();
    const deduped = [];
    for (const item of all) {
      const key = (item.url || "").replace(/\/$/, "").toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      deduped.push(item);
    }

    // Simple scoring: boost site, then title match density, then shorter URLs
    const qTerms = q.split(/\s+/).filter(Boolean);
    function score(item) {
      let s = 0;
      if (item.source === "Site") s += 5;
      const t = (item.title || "").toLowerCase();
      const sn = (item.snippet || "").toLowerCase();
      for (const term of qTerms) {
        const re = new RegExp(`\\b${escapeRegex(term.toLowerCase())}\\b`, "g");
        s += (t.match(re) || []).length * 2;
        s += (sn.match(re) || []).length;
      }
      // Shorter display URLs are often more canonical
      s += Math.max(0, 2 - (item.displayUrl || "").length / 100);
      return s;
    }

    function escapeRegex(s) {
      return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    deduped.sort((a, b) => score(b) - score(a));

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    if (req.method === "OPTIONS") return res.status(200).end();

    return res.status(200).json({
      query: q,
      count: Math.min(count, deduped.length),
      results: deduped.slice(0, count),
      providers: {
        google: !!(GOOGLE_KEY && GOOGLE_CX),
        bing: !!BING_KEY,
      },
    });
  } catch (e) {
    return res.status(500).json({ error: "Internal error", details: String(e) });
  }
}

