// assets/js/login.js

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const guestBtn = document.getElementById("guestBtn");

  // Dummy accounts for demo (replace with real auth later)
  const users = [
    { email: "admin@nexoraprosuite.com", password: "admin123", role: "developer" },
    { email: "developer@nexoraprosuite.com", password: "dev123", role: "developer" },
    { email: "user@nexoraprosuite.com", password: "user123", role: "user" }
  ];

  // Login handler
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userEmail", user.email);

        alert(`Welcome, ${user.role}!`);

        if (user.role === "developer") {
          window.location.href = "developer.html"; // Private access
        } else if (user.role === "user") {
          window.location.href = "dashboard.html";
        }
      } else {
        alert("Invalid login. Please try again.");
      }
    });
  }

  // Guest login
  if (guestBtn) {
    guestBtn.addEventListener("click", () => {
      localStorage.setItem("userRole", "guest");
      localStorage.setItem("userEmail", "guest");
      alert("Welcome, Guest!");
      window.location.href = "features.html";
    });
  }
});
