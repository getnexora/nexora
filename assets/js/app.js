document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const popup = document.getElementById("welcome-popup");
  const mainContent = document.getElementById("main-content");
  const continueBtn = document.getElementById("continue-btn");
  const guestBtn = document.getElementById("guest-btn");
  const languageSelect = document.getElementById("language");

  // Hide loader after short delay
  setTimeout(() => {
    loader.style.display = "none";
    popup.style.display = "flex";
  }, 1200);

  function continueToSite() {
    const lang = languageSelect.value;
    localStorage.setItem("nexoraLang", lang);
    popup.style.display = "none";
    mainContent.classList.remove("hidden");
  }

  continueBtn.addEventListener("click", continueToSite);
  guestBtn.addEventListener("click", () => {
    localStorage.removeItem("nexoraLang");
    popup.style.display = "none";
    mainContent.classList.remove("hidden");
  });
});
