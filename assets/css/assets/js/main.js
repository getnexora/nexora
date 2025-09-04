// main.js - Nexora ProSuite
// Simple placeholder for interactivity
document.addEventListener("DOMContentLoaded", () => {
  console.log("Nexora ProSuite site loaded successfully ✅");
  // Contact form handler (placeholder)
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message! (Form backend coming soon)");
      form.reset();
    });
  }
});
