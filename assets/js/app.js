// Nexora ProSuite - Global Site Logic
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");

  // Fade out loader when ready
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 800);
  });

  // Handle preferences + translation
  document.addEventListener("nexoraReady", () => {
    const prefs = JSON.parse(localStorage.getItem("nexoraPrefs") || "{}");

    if (!prefs.guest && prefs.language) {
      applyTranslations(prefs.language);
    }
  });

  // Load translations dynamically
  function applyTranslations(langCode) {
    fetch("assets/data/languages.json")
      .then((res) => res.json())
      .then((langs) => {
        const lang = langs.find((l) => l.code === langCode);
        if (!lang || !lang.translations) return;

        Object.keys(lang.translations).forEach((key) => {
          const el = document.querySelector(`[data-i18n="${key}"]`);
          if (el) el.textContent = lang.translations[key];
        });
      })
      .catch((err) => console.error("Translation error:", err));
  }
});

