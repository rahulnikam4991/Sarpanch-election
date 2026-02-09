const results = [
  {
    name: "Rahul Nikam",
    party: "BJP",
    votes: null,
    status: "Awaited"
  },
  {
    name: "Nitin Nikam",
    party: "Shiv Sena",
    votes: null,
    status: "Awaited"
  },
  {
    name: "Sagar Nikam",
    party: "MNS",
    votes: null,
    status: "Awaited"
  }
];

const tbody = document.getElementById("resultBody");

results.forEach(r => {
  const row = `
    <tr>
      <td>${r.name}</td>
      <td>${r.party}</td>
      <td>${r.votes === null ? "Updating…" : r.votes}</td>
      <td>${r.status}</td>
    </tr>
  `;
  tbody.innerHTML += row;
});

/*
Future enhancement:
Fetch live data from SAP CPI

fetch("https://<cpi-endpoint>/sarpanchResults")
  .then(res => res.json())
  .then(data => updateTable(data));
*/
