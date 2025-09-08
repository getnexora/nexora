// assets/js/dashboard.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Dashboard page loaded");

  const stats = document.querySelectorAll(".stat-card");
  stats.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("hovered");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("hovered");
    });
  });
});
