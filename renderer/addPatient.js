// this is the javascript for the addRDV windows
  
'use strict'

const { ipcRenderer } = require('electron')
let addPatientWin;
const DataStore = require("../DataStore");


const patientsData = new DataStore({ name: "Patients Main" });
const patientItems = patientsData.getPatient();
const pat = patientItems.get();
const btn=document.getElementById('btn-check');
const btn1=document.getElementById('btn-submit1');
const lb1=document.getElementById('output1');
btn1.disabled = true;
console.log("heey")
document.getElementById('btn-check').addEventListener('click', () => {
  console.log("i'm here");
  const item1 = document.querySelector('#nom-patient').value;
  const item2 = document.querySelector('#prenom-patient').value;
  const item3 = document.querySelector('#num-tel').value;
  const item4 = document.querySelector('#date-naiss').value;
  const item5 = document.querySelector('#adresse').value;
  const item6 = document.querySelector('#mail').value;
  const item7 = document.querySelector('#info-med').value;
  if ((item1 != "") &&(item2 != "")&&(item3 != "")&&(item4 != "")&&(item5 != "")&&(item6 != "")&&(item7 != "")){
    let str=item3.toString();
    let int=parseInt(item3);
    if(Number.isInteger(int) && (str.length == 9)){
      const key = document.querySelector('#num-tel').value;
      if (patientItems.get(key.toString())!=null){
        lb1.value="Patient déjà existant"
        btn1.disabled = true;
      }
      else{
        lb1.value="Patient valide"
        btn1.disabled = false;
      }
      
    }
    else{
      btn1.disabled = true;
      lb1.value="Veuillez rentrer un numéro de téléphone valide"
    }
  }
  else{
    btn1.disabled = true;
    lb1.value="Veuillez remplir tous les champs"
  }

})
document.querySelector('form').addEventListener('submit', submitForm);

    function submitForm(e){
      e.preventDefault();
      const item1 = document.querySelector('#nom-patient').value;
      const item2 = document.querySelector('#prenom-patient').value;
      const item3 = document.querySelector('#num-tel').value;
      const item4 = document.querySelector('#date-naiss').value;
      const item5 = document.querySelector('#adresse').value;
      const item6 = document.querySelector('#mail').value;
      const item7 = document.querySelector('#info-med').value;
      ipcRenderer.send('item:add', [item1,item2,item3,item4,item5,item6,item7]);
    }