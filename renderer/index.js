// that's the js script for the main window
const { ipcRenderer } = require("electron");

document.getElementById("ajouter-rdv-btn").addEventListener("click", () => {
  ipcRenderer.send("ajouter-rdv");
});
