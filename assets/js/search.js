// ===== Universal Search Engine =====

// Local index: Nexora pages, apps, and extras
const LOCAL_INDEX = [
  { title: "Home", url: "index.html", snippet: "Back to the homepage." },
  { title: "Features", url: "features.html", snippet: "Explore Nexora's powerful features." },
  { title: "About", url: "about.html", snippet: "Learn more about Nexora." },
  { title: "Contact", url: "contact.html", snippet: "Get in touch with us." },
  { title: "Login", url: "login.html", snippet: "Access your account." },
  { title: "Sign Up", url: "signup.html", snippet: "Create your Nexora account." },
  { title: "Dashboard", url: "dashboard.html", snippet: "View your enterprise dashboard." },

  // Example apps
  { title: "Email", url: "https://mail.nexora.com", snippet: "Check your Nexora email." },
  { title: "CRM", url: "https://crm.nexora.com", snippet: "Customer Relationship Management." },
  { title: "Analytics", url: "https://analytics.nexora.com", snippet: "Business insights and analytics." },

  // Local News (static for now)
  {
    title: "Local News",
    url: "https://news.google.com",
    snippet: "Latest local news updates tailored to your region."
  }
];

// Supported global engines
const SEARCH_ENGINES = {
  google: "https://www.google.com/search?q=",
  baidu: "https://www.baidu.com/s?wd=",
  yandex: "https://yandex.com/search/?text=",
  bing: "https://www.bing.com/search?q="
};

// DOM elements
const input = document.getElementById("searchInput");
const button = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("searchResults");

// Run search
function runSearch() {
  const query = input.value.trim();
  resultsDiv.innerHTML = "";

  if (!query) return;

  // Detect !engine query
  if (query.startsWith("!")) {
    const parts = query.split(" ");
    const engineKey = parts[0].substring(1).toLowerCase();
    const searchTerms = parts.slice(1).join(" ");

    if (SEARCH_ENGINES[engineKey]) {
      window.open(SEARCH_ENGINES[engineKey] + encodeURIComponent(searchTerms), "_blank");
      return;
    }
  }

  // Local search
  const results = LOCAL_INDEX.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.snippet.toLowerCase().includes(query.toLowerCase())
  );

  if (results.length === 0) {
    resultsDiv.innerHTML = `<p>No results found. Try <code>!google ${query}</code></p>`;
    return;
  }

  // Show results
  results.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.snippet}</p>
      <a href="${item.url}" target="_blank">Open</a>
    `;
    resultsDiv.appendChild(card);
  });
}

// Event listeners
button.addEventListener("click", runSearch);

// Trigger search with Enter key
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    runSearch();
  }
});
