// assets/js/apps.js

async function loadApps() {
  const grid = document.getElementById("apps-grid");
  if (!grid) return;

  try {
    const res = await fetch("assets/apps/apps.json");
    const apps = await res.json();

    grid.innerHTML = "";

    apps.forEach(app => {
      const card = document.createElement("article");
      card.className = "card";

      card.innerHTML = `
        <h3 class="gold-gradient">${app.name}</h3>
        <p>${app.description}</p>
        <a href="${app.link}" target="_blank" class="btn gold" style="margin-top:10px;">Open</a>
      `;

      grid.appendChild(card);
    });
  } catch (err) {
    grid.innerHTML = "<p style='color:red;'>Failed to load apps.</p>";
    console.error("Error loading apps:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadApps);
