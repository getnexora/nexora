// ========================
// Nexora Dashboard JS
// ========================

// Select all dashboard buttons
const buttons = document.querySelectorAll(".dashboard .card .btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const parentCard = btn.closest(".card");
    const title = parentCard.querySelector("h2").innerText;

    // Simple test behavior
    alert(`✅ You clicked "${title}"`);
  });
});

// Example: dynamic content load (expandable for future)
function loadDashboardData() {
  console.log("📊 Loading dashboard data...");

  // Example: fake analytics data
  const analyticsData = {
    users: 1245,
    sessions: 3520,
    active: 128,
  };

  console.log("✅ Analytics Data:", analyticsData);
}

loadDashboardData();
