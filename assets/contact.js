// assets/js/contact.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name || !email || !message) {
      status.textContent = "⚠️ Please fill in all fields.";
      status.style.color = "red";
      return;
    }

    // Simulate sending (no backend)
    status.textContent = "⏳ Sending...";
    status.style.color = "gold";

    setTimeout(() => {
      status.textContent = "✅ Thank you, your message has been sent!";
      status.style.color = "limegreen";
      form.reset();
    }, 1200);
  });
});
