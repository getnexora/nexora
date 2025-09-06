document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("apps-container");

  fetch("data/apps.json")
    .then(response => response.json())
    .then(apps => {
      container.innerHTML = "";
      apps.forEach(app => {
        const div = document.createElement("div");
        div.className = "app-card";
        div.innerHTML = `
          <h3>${app.name}</h3>
          <p>${app.description}</p>
          <a href="${app.link}" target="_blank">Open</a>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      container.innerHTML = "⚠️ Could not load apps.";
      console.error("Error loading apps.json:", err);
    });
});
