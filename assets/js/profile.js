// assets/js/profile.js
document.addEventListener("DOMContentLoaded", () => {
  const nameEl = document.getElementById("profileName");
  const emailEl = document.getElementById("profileEmail");
  const editBtn = document.getElementById("editProfile");
  const logoutBtn = document.getElementById("logout");

  // Load user from localStorage (created by login/signup), or fallback
  const loadUser = () => {
    try {
      const raw = localStorage.getItem("nexoraUser");
      if (!raw) {
        return { name: "Guest User", email: "guest@example.com" };
      }
      const parsed = JSON.parse(raw);
      return {
        name: parsed.name || parsed.fullname || "Guest User",
        email: parsed.email || "guest@example.com",
      };
    } catch {
      return { name: "Guest User", email: "guest@example.com" };
    }
  };

  const saveUser = (user) => {
    localStorage.setItem(
      "nexoraUser",
      JSON.stringify({ name: user.name, email: user.email })
    );
  };

  let user = loadUser();
  nameEl.textContent = user.name;
  emailEl.textContent = user.email;

  // Edit profile (demo)
  editBtn.addEventListener("click", () => {
    const newName = prompt("Enter new name:", user.name);
    if (!newName) return;
    const newEmail = prompt("Enter new email:", user.email);
    if (!newEmail) return;

    user = { name: newName.trim(), email: newEmail.trim() };
    saveUser(user);
    nameEl.textContent = user.name;
    emailEl.textContent = user.email;
    alert("Profile updated (demo).");
  });

  // Logout (demo)
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("nexoraUser");
    alert("You have been logged out (demo).");
    window.location.href = "login.html";
  });
});
