// ================= Nexora ProSuite App Logic =================

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");
  const welcomeModal = document.getElementById("welcomeModal");
  const languageSelect = document.getElementById("languageSelect");
  const continueBtn = document.getElementById("continueBtn");
  const guestBtn = document.getElementById("guestBtn");

  // ---- Loader always disappears after load ----
  setTimeout(() => {
    if (loader) {
      loader.classList.add("hidden");
    }
    // Show modal only if language not set
    const savedLang = localStorage.getItem("nexora_language");
    if (!savedLang && welcomeModal) {
      welcomeModal.classList.add("active");
    }
  }, 1200);

  // ---- Continue button ----
  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      const lang = languageSelect.value || "en";
      localStorage.setItem("nexora_language", lang);
      closeModal();
    });
  }

  // ---- Guest button ----
  if (guestBtn) {
    guestBtn.addEventListener("click", () => {
      localStorage.setItem("nexora_language", "guest");
      closeModal();
    });
  }

  // ---- Close modal helper ----
  function closeModal() {
    if (welcomeModal) {
      welcomeModal.classList.remove("active");
    }
  }
});
