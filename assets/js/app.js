// assets/js/apps.js

async function loadApps() {
  const grid = document.getElementById("appsGrid");
  const countryFilter = document.getElementById("countryFilter");
  const categoryFilter = document.getElementById("categoryFilter");

  // Try both possible locations for apps.json
  const paths = ["data/apps.json", "assets/apps.json"];
  let apps = null;

  for (let path of paths) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        apps = await response.json();
        console.log(`Loaded apps.json from: ${path}`);
        break;
      }
    } catch (err) {
      console.warn(`Failed to load from ${path}`, err);
    }
  }

  if (!apps) {
    grid.innerHTML = "<p>Error: Could not load apps.json</p>";
    return;
  }

  function renderApps() {
    const country = countryFilter.value;
    const category = categoryFilter.value;

    grid.innerHTML = "";

    const filtered = apps.filter(app => {
      const matchCountry =
        country === "all" || app.country === country || app.country === "global";
      const matchCategory = category === "all" || app.category === category;
      return matchCountry && matchCategory;
    });

    if (filtered.length === 0) {
      grid.innerHTML = "<p>No apps found for this filter.</p>";
      return;
    }

    filtered.forEach(app => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${app.name}</h3>
        <p><strong>Country:</strong> ${app.country}</p>
        <p><strong>Category:</strong> ${app.category}</p>
        <a href="${app.link}" target="_blank">Open</a>
      `;
      grid.appendChild(card);
    });
  }

  countryFilter.addEventListener("change", renderApps);
  categoryFilter.addEventListener("change", renderApps);

  renderApps();
}

document.addEventListener("DOMContentLoaded", loadApps);
