// that's the entry point for our app
const electron = require("electron");
const path = require("path");
const url = require("url");
const Window = require('./Window');
const DataStore = require('./DataStore')

// create a new todo store name "Todos Main"
const patientsData = new DataStore({ name: 'Patients Main' })
// SET ENV
process.env.NODE_ENV = "development";

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addRdvWindow;
let addPatientWin;
let suppPatientWin;
let affPatientsWindow;

// Listen for app to be ready
app.on("ready", function () {
  // Create new window
  mainWindow = new BrowserWindow({
    webPreferences: {
            nodeIntegration: true
        }
  });
  // Load html in window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "renderer", "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  // Quit app when closed
  mainWindow.on("closed", function () {
    app.quit();
  });

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);

});

// Handle add item window
ipcMain.on("ajouter-rdv", () => {
  addRdvWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Ajouter RDV",
    webPreferences: {
      nodeIntegration: true,
    },
  });
  addRdvWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "renderer", "addRDV.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  // Handle garbage collection
  addRdvWindow.on("close", function () {
    addRdvWindow = null;
  });
});



ipcMain.on('add-patient-window', () => {
  // if addTodoWin does not already exist
  if (!addPatientWin) {
    // create a new add patient window
    addPatientWin = new Window({
      file: path.join(__dirname, "renderer", 'addPatient.html'),
      width: 500,
      height: 350,
      title:'Ajouter un patient',
      webPreferences: {
            nodeIntegration: true
      },
      // close with the main window
      parent: mainWindow
    })

    // cleanup
    addPatientWin.on('closed', () => {
      addPatientWin = null
    })
  }
})
function createAddPatientWindow(){
  addPatientWindow = new BrowserWindow({
    webPreferences: {
            nodeIntegration: true
    },
    width: 500,
    height:350,
    title:'Ajouter un patient'
  });
  addPatientWindow.loadURL(url.format({
    pathname: path.join(__dirname, "renderer", 'addPatient.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Handle garbage collection
  addPatientWindow.on('close', function(){
    addPatientWindow = null;
  });
}
function createSuppPatientWindow(){
  suppPatientWindow = new BrowserWindow({
    webPreferences: {
            nodeIntegration: true
    },
    width: 500,
    height:350,
    title:'Supprimer un patient'
  });
  suppPatientWindow.loadURL(url.format({
    pathname: path.join(__dirname, "renderer", 'suppPatient.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Handle garbage collection
  suppPatientWindow.on('close', function(){
    suppPatientWindow = null;
  });
}
function createAfficherPatientsWindow(){
  affPatientsWindow = new BrowserWindow({
    webPreferences: {
            nodeIntegration: true
    },
    width: 500,
    height:350,
    title:'Afficher tous les patients'
  });
  affPatientsWindow.loadURL(url.format({
    pathname: path.join(__dirname, "renderer", 'affPatients.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Handle garbage collection
  affPatientsWindow.on('close', function(){
    affPatientsWindow = null;
  });
}

// add-todo from add todo window
ipcMain.on('item:add', function(event, patient) {
  const updatedPatients = patientsData.addPatient(patient).patients

  mainWindow.send('patients', updatedPatients)
  //addPatientWindow.close();
})

// delete-patient from todo list window
ipcMain.on('item:supp', function(event, patient) {
  const pat=patient.toString()
  const updatedPatients = patientsData.deletePatient(pat,patientsData).patients

  
  //addPatientWindow.close();
})
  

const mainMenuTemplate =  [
  // Each object is a dropdown
  {
    label: 'File',
    submenu:[
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Patient',
    submenu:[
      {
        label:'Ajouter Patient',
        click(){
          createAddPatientWindow();
        }
      },
      {
        label:'Supprimer Patient',
        click(){
          createSuppPatientWindow();
        }
      },
      {
        label: 'Afficher la liste des patients',
        click(){
          createAfficherPatientsWindow();
        }
      }
    ]
  }
];
// Add developer tools option if in dev
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        role: "reload",
      },
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
}
