// this is the javascript for the addRDV windows
const electron = require("electron");
const { ipcRenderer } = electron;
const RDV = require("./RDV");
// todo take care of the values of path and filename
// check Node.js required modules are singletons or not
let form = document.querySelector("form");
form.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  const patientName = document.querySelector("#nom-patient").value;
  const patientTelNum = document.querySelector("#num-tel").value;
  const dateTime = document.querySelector("#date-heure-rdv").value;
  const object = document.querySelector("#obj").value;
  const rdv = new RDV(patientName, patientTelNum, dateTime, object);
  form.reset();
  console.log(rdv);
  ipcRenderer.send("rdv:add", rdv);
}
