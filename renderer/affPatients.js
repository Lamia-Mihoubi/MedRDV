const electron = require('electron');
const {ipcRenderer} = electron;
const ul = document.querySelector('ul');
const DataStore = require('/home/nsarah/Documents/2CS-SIQ3-S2/2019-2020/ALOG/TP/TP1/MedRDV/DataStore')
// Catch item:aff
const patientsData = new DataStore({ name: 'Patients Main' });
let affPatientsWindow;
console.log("holaaaaaaaa");
const patientItems = patientsData.getPatient();
const tt=JSON.stringify(patientItems.get())
const pat =patientItems.get()
console.log(tt);
const item=['hello','good'];
ul.className = 'collection';
const li = document.createElement('li');
li.className = 'collection-item';
const itemText = document.createTextNode(item);

li.appendChild(itemText);
ul.appendChild(li);


const patientsList = document.getElementById('patientsList');

  // create html string
  const patientsItems = pat.reduce((html, patient) => {
    html += `<li class="patient-item">${patient}</li>`

    return html
  }, '');

  // set list html to the todo items
  patientsList.innerHTML = patientsItems