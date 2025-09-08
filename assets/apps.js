// assets/js/apps.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Apps page loaded");

  fetch("assets/apps/apps.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("apps-list");
      if (!container) return;

      container.innerHTML = "";
      data.apps.forEach(app => {
        const div = document.createElement("div");
        div.className = "app-card";
        div.innerHTML = `
          <h3>${app.name}</h3>
          <p>${app.description}</p>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => console.error("Error loading apps:", err));
});
