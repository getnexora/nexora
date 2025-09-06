// ===== Local Pages =====
const LOCAL_INDEX = [
  { title: "Nexora ProSuite - Home", url: "index.html", snippet: "The exclusive enterprise portal connecting 195 countries." },
  { title: "Features", url: "features.html", snippet: "Explore premium enterprise features and tiered membership." },
  { title: "About", url: "about.html", snippet: "Learn more about Nexora ProSuite and our mission." },
  { title: "Contact", url: "contact.html", snippet: "Get in touch with Nexora ProSuite support and partnerships." },
  { title: "Member Login", url: "login.html", snippet: "Secure member login for Nexora ProSuite users." }
];

// ===== Your Nexora Apps =====
const APP_INDEX = [
  { title: "Email", url: "https://mail.nexora.com", snippet: "Access your Nexora ProSuite email inbox." },
  { title: "Docs", url: "https://docs.nexora.com", snippet: "Collaborate on documents in real time." },
  { title: "CRM", url: "https://crm.nexora.com", snippet: "Manage customer relationships and sales pipelines." },
  { title: "Analytics", url: "https://analytics.nexora.com", snippet: "Track enterprise performance with global insights." },
  { title: "Calendar", url: "https://calendar.nexora.com", snippet: "Schedule global meetings and events." }
];

// ===== Global Apps Used in 195+ Countries =====
const GLOBAL_APPS = [
  // Messaging
  { title: "WhatsApp", url: "https://web.whatsapp.com", snippet: "Chat with anyone, anywhere." },
  { title: "WeChat", url: "https://wechat.com", snippet: "China's #1 messaging and payment platform." },
  { title: "Telegram", url: "https://web.telegram.org", snippet: "Fast and secure messaging app." },
  { title: "Signal", url: "https://signal.org", snippet: "Private messaging with end-to-end encryption." },

  // Social Media
  { title: "Facebook", url: "https://facebook.com", snippet: "Connect with friends and communities worldwide." },
  { title: "Instagram", url: "https://instagram.com", snippet: "Photo and video sharing platform." },
  { title: "TikTok", url: "https://tiktok.com", snippet: "Short videos for entertainment and trends." },
  { title: "LinkedIn", url: "https://linkedin.com", snippet: "Professional networking across industries." },
  { title: "Twitter (X)", url: "https://x.com", snippet: "Real-time news and conversations globally." },

  // Productivity
  { title: "Gmail", url: "https://mail.google.com", snippet: "Google’s global email platform." },
  { title: "Outlook", url: "https://outlook.com", snippet: "Microsoft email and calendar service." },
  { title: "Google Drive", url: "https://drive.google.com", snippet: "Cloud storage and collaboration tools." },
  { title: "Dropbox", url: "https://dropbox.com", snippet: "Cloud storage and file sharing." },
  { title: "Slack", url: "https://slack.com", snippet: "Team collaboration and messaging." },
  { title: "Microsoft Teams", url: "https://teams.microsoft.com", snippet: "Workplace chat, meetings, and collaboration." },
  { title: "Zoom", url: "https://zoom.us", snippet: "Video conferencing across the globe." },

  // Payments
  { title: "PayPal", url: "https://paypal.com", snippet: "Global online payments and transfers." },
  { title: "Alipay", url: "https://global.alipay.com", snippet: "China’s leading digital wallet." },
  { title: "Wise", url: "https://wise.com", snippet: "International money transfers with low fees." },
  { title: "Stripe", url: "https://stripe.com", snippet: "Online payments infrastructure for businesses." },

  // Shopping
  { title: "Amazon", url: "https://amazon.com", snippet: "E-commerce giant serving multiple countries." },
  { title: "eBay", url: "https://ebay.com", snippet: "Buy and sell globally through auctions and listings." },
  { title: "Alibaba", url: "https://alibaba.com", snippet: "Global B2B e-commerce marketplace." },
  { title: "Shopee", url: "https://shopee.com", snippet: "E-commerce across Asia." },
  { title: "Flipkart", url: "https://flipkart.com", snippet: "India’s top online marketplace." }
];

// ===== Universal Search Logic =====
function performSearch(query) {
  query = query.toLowerCase();
  const COMBINED_INDEX = [...LOCAL_INDEX, ...APP_INDEX, ...GLOBAL_APPS];

  const results = COMBINED_INDEX.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.snippet.toLowerCase().includes(query)
  );
  return results;
}

// ===== Render Results =====
function renderResults(results) {
  const container = document.getElementById("searchResults");
  if (!results.length) {
    container.innerHTML = "<p>No results found.</p>";
  } else {
    container.innerHTML = "<ul>" + results.map(r =>
      `<li><a href="${r.url}" target="_blank">${r.title}</a><br><small>${r.snippet}</small></li>`
    ).join("") + "</ul>";
  }
  container.style.display = "block";
}

// ===== Event Listeners =====
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.trim();
  if (query) {
    const results = performSearch(query);
    renderResults(results);
  }
});

document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.getElementById("searchBtn").click();
  }
});

