// assets/js/auth.js

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");

  // Toggle password visibility
  if (togglePassword) {
    togglePassword.addEventListener("click", () => {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      togglePassword.textContent = type === "password" ? "👁️" : "🙈";
    });
  }

  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
        loginMessage.textContent = "⚠️ Please fill in all fields.";
        loginMessage.style.color = "gold";
        return;
      }

      // Example login check
      if (email === "test@nexora.com" && password === "password123") {
        loginMessage.textContent = "✅ Login successful! Redirecting...";
        loginMessage.style.color = "lightgreen";
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1500);
      } else {
        loginMessage.textContent = "❌ Invalid email or password.";
        loginMessage.style.color = "red";
      }
    });
  }
});
