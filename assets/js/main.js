// Main initialization logic
document.addEventListener("DOMContentLoaded", () => {
  console.log("Nexora ProSuite initialized ✅");

  // Example: check preferences
  const prefs = localStorage.getItem("userPreferences");
  if (prefs) {
    console.log("Loaded user preferences:", JSON.parse(prefs));
  }
});
