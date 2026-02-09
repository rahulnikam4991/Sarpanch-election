const DATA_URL =
  "https://raw.githubusercontent.com/rahulnikam4991/Sarpanch-election/main/data/results.json";

fetch(DATA_URL)
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById("resultBody");
    const lastUpdated = document.getElementById("lastUpdated");

    tbody.innerHTML = "";

    data.results.forEach(r => {
      tbody.innerHTML += `
        <tr>
          <td>${r.name}</td>
          <td>${r.party}</td>
          <td>${r.votes}</td>
          <td>${r.status}</td>
        </tr>
      `;
    });

    lastUpdated.innerText =
      "Last Updated: " + data.lastUpdated + " (via SAP CPI)";
  })
  .catch(() => {
    document.getElementById("resultBody").innerHTML = `
      <tr>
        <td colspan="4">⚠️ Results not available</td>
      </tr>
    `;
  });
