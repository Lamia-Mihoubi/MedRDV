const electron = require("electron");
const { ipcRenderer } = electron;
const ul = document.querySelector("ul");
const DataStore = require("../DataStore");


const patientsData = new DataStore({ name: "Patients Main" });


let affPatientsWindow;
const patientItems = patientsData.getPatient();
const pat = patientItems.get();
ul.className = "collection";
var table = document.getElementById("table");
var i=1
// Create an empty <tr> element and add it to the 1st position of the table:

for (let key in pat) {
	const test=patientItems.get(key)

  	var row = table.insertRow(i);
	const tet=String(patientItems.get(key.toString()));
	const res=tet.split(",");
	// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	var cell6 = row.insertCell(5);
	var cell7 = row.insertCell(6);

	// Add some text to the new cells:
	cell1.innerHTML = test[0];
	cell2.innerHTML = test[1];
	cell3.innerHTML = test[2];
	cell4.innerHTML = test[3];
	cell5.innerHTML = test[4];
	cell6.innerHTML = test[5];
	cell7.innerHTML = test[6];
	i=i+1;
}

document.getElementById('btn-fermer').addEventListener('click', () => {
  ipcRenderer.send('btn:fermer')
})