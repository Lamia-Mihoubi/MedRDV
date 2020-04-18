// this is the javascript for the addRDV windows
// const electron = require("electron");
// const { ipcRenderer } = electron;
const rdvM = require("./RDVManager");
rdvManager = new rdvM();
// todo take care of the values of path and filename
// check Node.js required modules are singletons or not
rdvManager.initRdvList();
document.querySelector("form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  const patientName = document.querySelector("#nom-patient").value;
  const patientTelNum = document.querySelector("#num-tel").value;
  const dateTime = document.querySelector("#date-heure-rdv").value;
  const object = document.querySelector("#obj").value;
  rdvManager.createRDV(patientName, patientTelNum, dateTime, object);
  console.log(rdvManager.rdvList);
  //console.log(ipcRenderer);
  //ipcRenderer.send("item:add", item);
}
