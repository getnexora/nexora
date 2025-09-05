// ========================
// Nexora Login / Signup JS
// ========================

// Password toggle
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", () => {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  });
}

// Handle login form
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("⚠️ Please enter your email and password.");
      return;
    }

    // Temporary success response
    alert(`✅ Logged in as ${email}`);
    window.location.href = "dashboard.html";
  });
}

// Handle signup form
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();

    if (!name || !email || !password || !confirmPassword) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("⚠️ Passwords do not match.");
      return;
    }

    // Temporary success response
    alert(`✅ Account created for ${name}`);
    window.location.href = "dashboard.html";
  });
}

// Guest login
const guestButtons = document.querySelectorAll(".guest-btn");
guestButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    alert("✅ Continuing as Guest");
    window.location.href = "dashboard.html";
  });
});
