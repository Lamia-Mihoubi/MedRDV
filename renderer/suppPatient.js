// this is the javascript for the suppPatient windows
'use strict'

const { ipcRenderer } = require('electron');
const DataStore = require("../DataStore");


const patientsData = new DataStore({ name: "Patients Main" });


let affPatientsWindow;
const patientItems = patientsData.getPatient();
const pat = patientItems.get();
const ul = document.getElementById("patientList");
ul.className = "collection";
const li = document.createElement("li");
li.className = "collection-item";
const text=document.createTextNode("Rien trouvé")
li.appendChild(text);
ul.appendChild(li);
const bt=document.getElementById('btn-submit');
bt.disabled = true;
document.getElementById('btn-search').addEventListener('click', () => {
	console.log("i'm here");
	const key = document.querySelector('#num-tel').value;
	if (patientItems.get(key.toString())!=null){
		text.nodeValue=key.toString() + "\n" + String(patientItems.get(key.toString()))
		bt.disabled = false;
	}
	else{
		text.nodeValue="Rien trouvé"
		bt.disabled = true;
	}

})

document.querySelector('form').addEventListener('submit', submitForm);
    function submitForm(e){
      e.preventDefault();
      const item3 = document.querySelector('#num-tel').value;
      ipcRenderer.send('item:supp', item3);
    }