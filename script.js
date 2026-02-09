const DATA_URL =
  "https://cdn.jsdelivr.net/gh/rahulnikam4991/Sarpanch-election@main/data/results.json" +
  "?ts=" + Date.now() +
  "&rand=" + Math.random();

function loadResults() {
  fetch(DATA_URL, {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache",
      "Pragma": "no-cache"
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("HTTP error " + res.status);
      }
      return res.json();
    })
    .then(data => {
      const tbody = document.getElementById("resultBody");
      const lastUpdated = document.getElementById("lastUpdated");

      tbody.innerHTML = "";

      if (!data.results || data.results.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="4">⚠️ Results not available</td>
          </tr>
        `;
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
        "Last Updated: " + data.lastUpdated + " (via SAP CPI)";
    })
    .catch(err => {
      console.error(err);
      document.getElementById("resultBody").innerHTML = `
        <tr>
          <td colspan="4">⚠️ Results not available</td>
        </tr>
      `;
    });
}

// Initial load only
loadResults();
