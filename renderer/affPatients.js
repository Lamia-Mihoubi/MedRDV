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
  const test=patientItems.get(key)
  li.appendChild(document.createTextNode(test[2].concat("     ",test[0],"   |   ",test[1],"   |    ",test[2],"   |    ",test[3],"   |     ",test[4],"   |   ",test[5],"   |    ",test[6])));
  ul.appendChild(li);
}

document.getElementById('btn-fermer').addEventListener('click', () => {
  ipcRenderer.send('btn:fermer')
})