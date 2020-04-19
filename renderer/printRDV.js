const electron = require("electron");
const { app, BrowserWindow} = electron;
const path = require("path");
const url = require("url");
const { ipcRenderer,ipcMain } = electron;

const op1=document.getElementById('op1');
const op2=document.getElementById('op2');
const op3=document.getElementById('op3');
const op4=document.getElementById('op4');
const op5=document.getElementById('op5');
ipcRenderer.on('printRDV',(event,list)=>{
	console.log("printRDV")
	op1.value=list[0];

})
