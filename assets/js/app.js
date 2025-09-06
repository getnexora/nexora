document.addEventListener("DOMContentLoaded", () => {
  const appsContainer = document.getElementById("apps-container");

  fetch("data/apps.json")
    .then(response => response.json())
    .then(apps => {
      appsContainer.innerHTML = apps.map(app => `
        <div class="app-card">
          <img src="${app.icon}" alt="${app.name}" class="app-icon" />
          <h3>${app.name}</h3>
          <a href="${app.url}" target="_blank">Open</a>
        </div>
      `).join("");
    })
    .catch(error => {
      console.error("Error loading apps:", error);
      appsContainer.innerHTML = "<p>Could not load apps.</p>";
    });
});

