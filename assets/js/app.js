document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("apps-container");

  fetch("data/apps.json")
    .then(response => response.json())
    .then(apps => {
      if (!apps.length) {
        container.innerHTML = "<p>No apps available yet.</p>";
        return;
      }

      container.innerHTML = apps.map(app => `
        <div class="card">
          <h3>${app.name}</h3>
          <p>${app.category}</p>
          <a href="${app.url}" target="_blank">Open</a>
        </div>
      `).join("");
    })
    .catch(err => {
      container.innerHTML = "<p>Error loading apps.</p>";
      console.error(err);
    });
});
