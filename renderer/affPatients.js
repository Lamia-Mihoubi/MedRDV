const electron = require("electron");
const { ipcRenderer } = electron;
const ul = document.querySelector("ul");
const DataStore = require("../DataStore");


const patientsData = new DataStore({ name: "Patients Main" });


let affPatientsWindow;
const patientItems = patientsData.getPatient();
const pat = patientItems.get();
ul.className = "collection";

for (let key in pat) {
  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(
    document.createTextNode(key + "\n" + String(patientItems.get(key)))
  );
  ul.appendChild(li);
}

document.getElementById('btn-fermer').addEventListener('click', () => {
  ipcRenderer.send('btn:fermer')
})