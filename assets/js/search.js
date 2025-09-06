// ===== Nexora ProSuite Universal Search =====

// Local site pages
const LOCAL_INDEX = [
  { title: "Home", url: "index.html", snippet: "Welcome to Nexora ProSuite, the global enterprise portal." },
  { title: "Features", url: "features.html", snippet: "Discover Nexora’s unique features and enterprise tools." },
  { title: "About", url: "about.html", snippet: "Learn more about Nexora’s mission and vision." },
  { title: "Contact", url: "contact.html", snippet: "Get in touch with our global support team." },
  { title: "Login", url: "login.html", snippet: "Access your secure member account." },
];

// Example apps (you can keep adding more here)
const APP_INDEX = [
  { title: "Email", url: "https://mail.nexora.com", snippet: "Access your Nexora ProSuite email inbox." },
  { title: "Docs", url: "https://docs.nexora.com", snippet: "Collaborate on documents in real time." },
  { title: "CRM", url: "https://crm.nexora.com", snippet: "Manage customer relationships and sales pipelines." },
  { title: "Analytics", url: "https://analytics.nexora.com", snippet: "Track enterprise performance with insights." },
  { title: "Calendar", url: "https://calendar.nexora.com", snippet: "Schedule global meetings and events." }
];

// Combine pages + apps
function performSearch(query) {
  query = query.toLowerCase();

  const COMBINED_INDEX = [...LOCAL_INDEX, ...APP_INDEX];

  return COMBINED_INDEX.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.snippet.toLowerCase().includes(query)
  );
}

// Render results
function renderResults(results) {
  const container = document.getElementById("searchResults");
  container.innerHTML = "";

  if (results.length === 0) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }

  results.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("search-item");
    div.innerHTML = `
      <h3><a href="${item.url}" target="_blank">${item.title}</a></h3>
      <p>${item.snippet}</p>
    `;
    container.appendChild(div);
  });
}

// Setup search listeners
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const button = document.getElementById("searchBtn");

  button.addEventListener("click", () => {
    const query = input.value.trim();
    renderResults(performSearch(query));
  });

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = input.value.trim();
      renderResults(performSearch(query));
    }
  });
});
