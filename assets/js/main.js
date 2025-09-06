// ===== Nexora ProSuite Main Script =====

// Run when the page finishes loading
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  // Hide loader
  if (loader) {
    loader.classList.add("hidden");
  }

  // Check if preferences exist
  const prefs = localStorage.getItem("nexoraUserPrefs");
  if (!prefs) {
    // Show welcome modal if no preferences
    const modal = document.getElementById("welcomeModal");
    if (modal) {
      modal.style.display = "flex";
    }
  } else {
    // Apply saved preferences
    const savedPrefs = JSON.parse(prefs);
    applyLanguage(savedPrefs.language || "en");
  }
});

// ===== Modal Save Button =====
const saveBtn = document.getElementById("savePreferences");
if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const country = document.getElementById("country")?.value || "";
    const region = document.getElementById("region")?.value || "";
    const postal = document.getElementById("postal")?.value || "";
    const language = document.getElementById("language")?.value || "en";

    const userPrefs = { country, region, postal, language };

    // Save preferences
    localStorage.setItem("nexoraUserPrefs", JSON.stringify(userPrefs));

    // Hide modal
    const modal = document.getElementById("welcomeModal");
    if (modal) {
      modal.style.display = "none";
    }

    // Apply chosen language
    applyLanguage(language);
  });
}

// ===== Apply Language (placeholder for now) =====
function applyLanguage(langCode) {
  console.log("Switching language to:", langCode);

  // Example: change the welcome title
  const title = document.querySelector("h1");
  if (title) {
    if (langCode === "es") {
      title.textContent = "Bienvenido a Nexora ProSuite";
    } else if (langCode === "fr") {
      title.textContent = "Bienvenue à Nexora ProSuite";
    } else {
      title.textContent = "Welcome to Nexora ProSuite";
    }
  }
}
