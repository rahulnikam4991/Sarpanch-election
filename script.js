const BASE_URL =
  "https://cdn.jsdelivr.net/gh/rahulnikam4991/Sarpanch-election@main/data/results.json";

let lastHash = null;

async function loadResults() {
  try {
    // Aggressive cache bypass
    const url =
      BASE_URL +
      "?ts=" + Date.now() +
      "&rand=" + Math.random();

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      }
    });

    if (!res.ok) throw new Error("HTTP " + res.status);

    const text = await res.text();

    // Simple change detection (hash substitute)
    if (text === lastHash) {
      console.log("No change in results");
      return;
    }

    lastHash = text;
    const data = JSON.parse(text);

    renderTable(data);
  } catch (e) {
    console.warn("Fetch failed, retrying…", e);
  }
}

function renderTable(data) {
  const tbody = document.getElementById("resultBody");
  const lastUpdated = document.getElementById("lastUpdated");

  tbody.innerHTML = "";

  if (!data.results || data.results.length === 0) {
    tbody.innerHTML =
      `<tr><td colspan="4">Results not available</td></tr>`;
    return;
  }

  data.results.forEach(r => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${r.name}</td>
      <td>${r.party}</td>
      <td>${r.votes}</td>
      <td>${r.status}</td>
    `;
    tbody.appendChild(row);
  });

  lastUpdated.innerText =
    "Last Updated: " + data.lastUpdated + " (auto-synced)";
}

// Initial load
loadResults();

// Poll every 8 seconds (safe for GitHub/CDN)
setInterval(loadResults, 8000);
