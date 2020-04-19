// that's the js script for the main window
const { ipcRenderer } = require("electron");

document.getElementById("ajouter-rdv-btn").addEventListener("click", () => {
  ipcRenderer.send("ajouter-rdv");
});
// create add todo window button
document.getElementById('createPatientBtn').addEventListener('click', () => {
  ipcRenderer.send('add-patient-window')
})