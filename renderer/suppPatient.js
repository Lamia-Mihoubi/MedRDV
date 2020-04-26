// this is the javascript for the suppPatient windows
'use strict'

const { ipcRenderer } = require('electron');
const DataStore = require("../DataStore");


const patientsData = new DataStore({ name: "Patients Main" });

var table = document.getElementById("table");
let affPatientsWindow;
const patientItems = patientsData.getPatient();
const pat = patientItems.get();
const ul = document.getElementById("patientList");
ul.className = "collection";
const li = document.createElement("output");
li.className = "collection-item";
const text=document.createTextNode("")
li.appendChild(text);
ul.appendChild(li);
const bt=document.getElementById('btn-submit');
bt.disabled = true;
document.getElementById('btn-search').addEventListener('click', () => {
	console.log("i'm here");
	const key = document.querySelector('#num-tel').value;
	if (patientItems.get(key.toString())!=null){
		text.nodeValue="Trouvé";

		// Create an empty <tr> element and add it to the 1st position of the table:
		var row = table.insertRow(1);
		const tet=String(patientItems.get(key.toString()));
		const res=tet.split(",");
		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);

		// Add some text to the new cells:
		cell1.innerHTML = res[0];
		cell2.innerHTML = res[1];
		bt.disabled = false;
	}
	else{
		text.nodeValue="Rien trouvé"
		bt.disabled = true;
	}

})

const form=document.querySelector('form');
document.querySelector('form').addEventListener('submit', submitForm);
    function submitForm(e){
      e.preventDefault();
      const item3 = document.querySelector('#num-tel').value;
      ipcRenderer.send('item:supp', item3);
      table.deleteRow(1);
      text.nodeValue=""
      bt.disabled = true;
      form.reset();
    }