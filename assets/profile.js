// assets/js/profile.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Profile page loaded");

  const fileInput = document.getElementById("avatar-upload");
  const preview = document.getElementById("avatar-preview");

  if (fileInput && preview) {
    fileInput.addEventListener("change", e => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = ev => {
          preview.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
});
