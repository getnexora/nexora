// ===== Local Nexora Pages =====
const LOCAL_INDEX = [
  { title: "Home", url: "index.html", snippet: "Back to Nexora ProSuite homepage." },
  { title: "Features", url: "features.html", snippet: "Explore platform features and enterprise tools." },
  { title: "About", url: "about.html", snippet: "Learn more about Nexora ProSuite." },
  { title: "Contact", url: "contact.html", snippet: "Get in touch with our global team." },
  { title: "Login", url: "login.html", snippet: "Access your member account securely." },
  { title: "Sign Up", url: "signup.html", snippet: "Join Nexora ProSuite today." },
  { title: "Dashboard", url: "dashboard.html", snippet: "Your personalized enterprise dashboard." }
];

// ===== Example Apps (extend this list with real apps) =====
const APP_INDEX = [
  { title: "CRM", url: "apps/crm.html", snippet: "Customer Relationship Management system." },
  { title: "Email", url: "https://mail.nexora.com", snippet: "Secure enterprise email." },
  { title: "Docs", url: "apps/docs.html", snippet: "Collaborative document editing." },
  { title: "Analytics", url: "apps/analytics.html", snippet: "Powerful business insights." }
];

// ===== Global Engines =====
const GLOBAL_ENGINES = [
  { title: "Google", key: "google", url: "https://www.google.com/search?q=", snippet: "Search the web with Google." },
  { title: "Bing", key: "bing", url: "https://www.bing.com/search?q=", snippet: "Search the web with Microsoft Bing." },
  { title: "DuckDuckGo", key: "duckduckgo", url: "https://duckduckgo.com/?q=", snippet: "Privacy-focused global search." },
  { title: "Yahoo", key: "yahoo", url: "https://search.yahoo.com/search?p=", snippet: "Search with Yahoo." },
  { title: "Baidu", key: "baidu", url: "https://www.baidu.com/s?wd=", snippet: "China’s largest search engine." },
  { title: "Yandex", key: "yandex", url: "https://yandex.com/search/?text=", snippet: "Russia’s leading search engine." },
  { title: "Naver", key: "naver", url: "https://search.naver.com/search.naver?query=", snippet: "South Korea’s #1 search engine." },
  { title: "Ecosia", key: "ecosia", url: "https://www.ecosia.org/search?q=", snippet: "Eco-friendly search engine that plants trees." }
];

// ===== Perform Search =====
function performSearch(query) {
  const q = query.trim().toLowerCase();
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = "";

  // Check for external engine command
  if (q.startsWith("!")) {
    const parts = q.split(" ");
    const engineKey = parts[0].substring(1); // remove !
    const searchQuery = parts.slice(1).join(" ");

    const engine = GLOBAL_ENGINES.find(e => e.key === engineKey);
    if (engine) {
      // Show result card instead of instant redirect
      const card = document.createElement("div");
      card.classList.add("result-card");
      card.innerHTML = `
        <a href="${engine.url + encodeURIComponent(searchQuery)}" target="_blank">
          🔎 ${engine.title} Results for "${searchQuery}"
        </a>
        <p>${engine.snippet}</p>
      `;
      resultsContainer.appendChild(card);
      return;
    }
  }

  // Otherwise, search local + apps
  const COMBINED_INDEX = [...LOCAL_INDEX, ...APP_INDEX];
  const matches = COMBINED_INDEX.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.snippet.toLowerCase().includes(q)
  );

  if (matches.length > 0) {
    matches.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("result-card");
      card.innerHTML = `
        <a href="${item.url}" target="_blank">${item.title}</a>
        <p>${item.snippet}</p>
      `;
      resultsContainer.appendChild(card);
    });
  } else {
    resultsContainer.innerHTML = `<p style="color: var(--gray);">No results found for "${query}".</p>`;
  }
}

// ===== Event Listeners =====
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value;
  performSearch(query);
});

// Trigger search on Enter key
document.getElementById("searchInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.getElementById("searchBtn").click();
  }
});
