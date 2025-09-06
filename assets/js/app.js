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
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("welcome-modal");
  const saveBtn = document.getElementById("save-preferences");
  const guestBtn = document.getElementById("continue-guest");
  const appContent = document.getElementById("app");

  // Show modal on first visit
  if (!localStorage.getItem("userPreferences")) {
    modal.style.display = "flex";
  } else {
    appContent.style.display = "block";
  }

  // Load countries.json into dropdown
  fetch("assets/data/countries.json")
    .then((res) => res.json())
    .then((data) => {
      const countrySelect = document.getElementById("country");
      data.forEach((country) => {
        const opt = document.createElement("option");
        opt.value = country.code;
        opt.textContent = country.name;
        countrySelect.appendChild(opt);
      });
    })
    .catch((err) => console.error("Error loading countries:", err));

  // Save preferences
  saveBtn.addEventListener("click", () => {
    const preferences = {
      language: document.getElementById("language").value,
      country: document.getElementById("country").value,
      region: document.getElementById("region").value,
      postal: document.getElementById("postal").value,
    };

    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    modal.style.display = "none";
    appContent.style.display = "block";
  });

  // Continue as Guest
  guestBtn.addEventListener("click", () => {
    modal.style.display = "none";
    appContent.style.display = "block";
  });
});
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

