// assets/js/features.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Features page loaded");

  const cards = document.querySelectorAll(".feature-card");
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("highlight");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("highlight");
    });
  });
});
