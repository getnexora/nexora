// assets/js/login.js

const passwordInput = document.getElementById("password");
const toggleBtn = document.getElementById("togglePassword");
const loginForm = document.getElementById("login-form");

if (toggleBtn && passwordInput) {
  toggleBtn.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    toggleBtn.textContent = type === "password" ? "👁" : "🙈";
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Demo only — authentication not yet connected.");
  });
}
