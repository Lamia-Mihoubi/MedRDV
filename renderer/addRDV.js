// this is the javascript for the addRDV windows
const electron = require("electron");
const { ipcRenderer } = electron;
const RDV = require("./RDV");
// todo take care of the values of path and filename
// check Node.js required modules are singletons or not

const btn=document.getElementById('btn-check');
const btn1=document.getElementById('btn-submit');
const lb1=document.getElementById('output1');
const btn2=document.getElementById('btn-check2');
const lb2=document.getElementById('output2');
const liste=["l1","l2","l3","l4","l5","l6","l7","nom-patient","prenom-patient","num-tel","date-naiss","adresse","mail","info-med","btn-check"];
const ll2=["l10","num-tel1","btn-check1"];
const DataStore = require("../DataStore");
diableElement1();
diableElement2();
const patientsData = new DataStore({ name: "Patients Main" });
const patientItems = patientsData.getPatient();
const pat = patientItems.get();
var ancien=false;
document.getElementById('nouv-btn').addEventListener('click',()=> {
  console.log(liste)
  console.log(ll2)
  enableElement1();
  diableElement2();
  ancien=false;
}); 
document.getElementById('an-btn').addEventListener('click',()=> {
  enableElement2();
  diableElement1();
  ancien=true;
}); 


function diableElement2(){
  ll2.forEach(element => document.getElementById(element).disabled = true);
  btn1.disabled=true;
}

function diableElement1(){
  liste.forEach(element => document.getElementById(element).disabled = true);
  btn1.disabled=true;
}
function enableElement1(){
  liste.forEach(element => document.getElementById(element).disabled = false);
}
function enableElement2(){
  ll2.forEach(element => document.getElementById(element).disabled = false);
}
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
        lb1.value="Patient valide";
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

});

document.getElementById('btn-check1').addEventListener('click', () => {
  console.log("i'm here");

  const item3 = document.querySelector('#num-tel1').value;
  
  if (item3 != ""){
    let str=item3.toString(); 
    let int=parseInt(item3);
    if(Number.isInteger(int) && (str.length == 9)){
      const test=patientItems.get(item3.toString());
      if (test!=null){
        lb2.value="Patient déjà existant".concat(" -->>> Nom: ",test[0],"| Prenom: ",test[1]);
        btn1.disabled = false;
      }
      else{
        lb2.value="Patient n'existe pas";
        btn1.disabled = true;
      }
      
    }
    else{
      btn1.disabled = true;
      lb2.value="Veuillez rentrer un numéro de téléphone valide"
    }
  }
  else{
    btn1.disabled = true;
    lb2.value="Veuillez remplir tous les champs"
  }

});


const form=document.querySelector('form')
form.addEventListener('submit', submitForm);

function submitForm(e) {
  console.log("hello11");
  e.preventDefault();
  console.log("hello");
  
  // creating the rdv for old patient
  if (ancien==true){
    console.log("ancien");
    const patientTelNum = document.querySelector("#num-tel1").value;
    const test =patientItems.get(patientTelNum.toString());
    const patientName = test[0];
    const patientName2 = test[1];
    const str=patientName.toString();
    const str1=patientName2.toString();
    const name=str.concat(" ",str1);
    console.log(name);
    
    const dateTime = document.querySelector("#date-heure-rdv").value;
    const object = document.querySelector("#obj").value;
    const rdv = new RDV(name , patientTelNum, dateTime, object);
      // clearing the form
    form.reset();
    // sending the rdv to the main process to add it to the rdvList
    ipcRenderer.send("rdv:add", rdv);
  }
  else{
    console.log("nouv");
    const item1 = document.querySelector('#nom-patient').value;
    const item2 = document.querySelector('#prenom-patient').value;
    const item3 = document.querySelector('#num-tel').value;
    const item4 = document.querySelector('#date-naiss').value;
    const item5 = document.querySelector('#adresse').value;
    const item6 = document.querySelector('#mail').value;
    const item7 = document.querySelector('#info-med').value;
    ipcRenderer.send('item:add', [item1,item2,item3,item4,item5,item6,item7]);
    const patientName = item1;
    const patientName2 = item2;
    const name=patientName.concat(" ",patientName2);
    console.log(name);
    const patientTelNum = document.querySelector("#num-tel").value;
    const dateTime = document.querySelector("#date-heure-rdv").value;
    const object = document.querySelector("#obj").value;
    const rdv = new RDV(name , patientTelNum, dateTime, object);
      // clearing the form
    form.reset();
    // sending the rdv to the main process to add it to the rdvList
    ipcRenderer.send("rdv:add", rdv);
  }

  
}
