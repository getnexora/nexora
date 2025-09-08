// assets/js/about.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("About page loaded");

  // Simple fade-in for content
  const sections = document.querySelectorAll("section");
  sections.forEach((sec, i) => {
    sec.style.opacity = 0;
    sec.style.transition = "opacity 1s ease";
    setTimeout(() => (sec.style.opacity = 1), 300 * i);
  });
});

