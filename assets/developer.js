// assets/js/developer.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Developer page loaded");

  const copyBtns = document.querySelectorAll(".copy-code");
  copyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const code = btn.previousElementSibling?.innerText || "";
      navigator.clipboard.writeText(code).then(() => {
        alert("Copied to clipboard!");
      });
    });
  });
});
