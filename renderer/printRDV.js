const electron = require("electron");
const { app, BrowserWindow} = electron;
const path = require("path");
const url = require("url");
const { ipcRenderer,ipcMain } = electron;

let affRDVPrint
const op1=document.getElementById('op1');
const op3=document.getElementById('op3');
const op4=document.getElementById('op4');
const op5=document.getElementById('op5');



const fs = require('fs')
fs.readFile('./renderer/rdv_one.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        const rdv = JSON.parse(jsonString)
        op1.value=rdv.nom;
        op3.value=rdv.numero;
        op4.value=rdv.date;
        op5.value=rdv.obj;
} catch(err) {
        console.log('Error parsing JSON string:', err)
    }
})

document.getElementById("btn").addEventListener("click", ()=>{
	window.print();
})