/* ===== Nexora ProSuite - Main Site Logic ===== */

// Run once the page DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");
  const modal = document.querySelector("#welcome-modal");

  // --- Loader Control ---
  function hideLoader() {
    if (loader) {
      loader.classList.add("hidden");
      setTimeout(() => loader.remove(), 600);
    }
  }

  // --- Apply Preferences (from localStorage) ---
  function applyPreferences() {
    const prefs = JSON.parse(localStorage.getItem("nexoraUserPrefs"));
    if (!prefs) return;

    // Example: Update body attribute with language
    if (prefs.language) {
      document.documentElement.setAttribute("lang", prefs.language);
    }

    // Example: Display location somewhere (like header/footer)
    const locationDisplay = document.querySelector("#user-location");
    if (locationDisplay && prefs.country) {
      locationDisplay.textContent = `${prefs.country}${
        prefs.region ? ", " + prefs.region : ""
      }`;
    }
  }

  // --- Initialize site once preferences are set ---
  function initSite() {
    hideLoader();
    applyPreferences();
    // Add any other global site startup code here
  }

  // --- Listen for app.js events ---
  window.addEventListener("preferencesSaved", initSite);
  window.addEventListener("continueAsGuest", initSite);

  // --- If preferences already saved before ---
  if (localStorage.getItem("nexoraUserPrefs")) {
    initSite();
  } else {
    // If no preferences, show welcome modal
    if (modal) {
      modal.style.display = "block";
    }
  }
});
