// assets/js/signup.js

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const signupMessage = document.getElementById("signupMessage");

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!name || !email || !password) {
        signupMessage.textContent = "⚠️ Please fill in all fields.";
        signupMessage.style.color = "gold";
        return;
      }

      // Save user in localStorage (temporary demo logic)
      localStorage.setItem("nexoraUser", JSON.stringify({ name, email }));

      signupMessage.textContent = "✅ Account created successfully! Redirecting...";
      signupMessage.style.color = "lightgreen";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    });
  }
});
