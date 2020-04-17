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
const item=['hello','good'];
ul.className = 'collection';

for (let key in pat){
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(key+"\n"+String(patientItems.get(key))));
  ul.appendChild(li);
  
}

//const itemText = document.createTextNode(JSON.stringify(pat[0]));



