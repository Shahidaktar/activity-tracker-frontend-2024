document.getElementById("btn1").addEventListener("click", fetchData);

function fetchData() {
  fetch("https://activity-tracker-extension.onrender.com/api/v1/tab/all")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("dataBody").innerHTML = "";

      data.tabs.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                   
                    <td>${item.url}</td>
                    <td>${item.timespent} hr</td>
                `;
        document.getElementById("dataBody").appendChild(row);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
