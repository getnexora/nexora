// Handle simple form submission (client-side only)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect values
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = "⚠️ Please fill out all fields.";
      status.style.color = "gold";
      return;
    }

    // Simulate sending (later can be connected to Firebase or backend)
    status.textContent = "✅ Message sent successfully!";
    status.style.color = "lightgreen";

    form.reset();
  });
});
