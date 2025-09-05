// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Select all password toggle buttons
  const toggles = document.querySelectorAll(".password-toggle");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      // Find the target input using data-target attribute
      const targetId = toggle.getAttribute("data-target");
      const input = document.getElementById(targetId);

      if (!input) return; // If no input found, do nothing

      if (input.type === "password") {
        input.type = "text";
        toggle.textContent = "🙈"; // Change icon when showing password
      } else {
        input.type = "password";
        toggle.textContent = "👁"; // Reset icon when hiding password
      }
    });
  });
});
