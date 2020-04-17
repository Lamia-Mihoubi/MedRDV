// this is the javascript for the suppPatient windows
'use strict'

const { ipcRenderer } = require('electron')

document.querySelector('form').addEventListener('submit', submitForm);

    function submitForm(e){
      e.preventDefault();
      const item1 = document.querySelector('#nom-patient').value;
      const item2 = document.querySelector('#prenom-patient').value;
      const item3 = document.querySelector('#num-tel').value;
      const item4 = document.querySelector('#date-naiss').value;
      const item5 = document.querySelector('#adresse').value;
      const item6 = document.querySelector('#mail').value;
      //const item7 = document.querySelector('#info-med').value;
      console.log(ipcRenderer);
      ipcRenderer.send('item:supp', item3);
    }