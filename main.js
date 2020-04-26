// that's the entry point for our app
const electron = require("electron");
const path = require("path");
const url = require("url");
const Window = require("./Window");
const DataStore = require("./DataStore");

// create a new patients store name "Patients Main"
const patientsData = new DataStore({ name: "Patients Main" });
const RDVManager = require("./renderer/RDVManager");
RDVManager.initRdvList();
// SET ENV
process.env.NODE_ENV = "development";
var EventEmitter = require('events').EventEmitter;

var print = new EventEmitter();
const { app, BrowserWindow, Menu, ipcMain } = electron;
var print_rdv;
let mainWindow;
let addRdvWindow;
let addPatientWin;
let suppPatientWin;
let affPatientsWindow;
let affRDVPrint;
// Listen for app to be ready
app.on("ready", function () {
  // Create new window
  mainWindow = new BrowserWindow({
    width: 980,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
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
    RDVManager.storeRdvList();
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
    width: 800,
    height: 800,
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

//Create the add patient window from clicking on the button ajouter patient
ipcMain.on("add-patient-window", () => {
  // if addTodoWin does not already exist
  if (!addPatientWin) {
    // create a new add patient window
    addPatientWin = new Window({
      file: path.join(__dirname, "renderer", "addPatient.html"),
      width: 500,
      height: 350,
      title: "Ajouter un patient",
      webPreferences: {
        nodeIntegration: true,
      },
      // close with the main window
      parent: mainWindow,
    });

    // cleanup
    addPatientWin.on("closed", () => {
      addPatientWin = null;
    });
  }
});
//Create the add patient window
function createAddPatientWindow() {
  if (!addPatientWin) {
    addPatientWin = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
      },
      width: 500,
      height: 350,
      title: "Ajouter un patient",
    });
    addPatientWin.loadURL(
      url.format({
        pathname: path.join(__dirname, "renderer", "addPatient.html"),
        protocol: "file:",
        slashes: true,
      })
    );
    // Handle garbage collection
    addPatientWin.on("close", function () {
      addPatientWin = null;
    });
  } else {
    addPatientWin.show();
  }
}
//Create the supp patient window
function createSuppPatientWindow() {
  if (!suppPatientWin) {
    suppPatientWin = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
      },
      width: 500,
      height: 350,
      title: "Supprimer un patient",
    });
    suppPatientWin.loadURL(
      url.format({
        pathname: path.join(__dirname, "renderer", "suppPatient.html"),
        protocol: "file:",
        slashes: true,
      })
    );
    // Handle garbage collection
    suppPatientWin.on("close", function () {
      suppPatientWin = null;
    });
  } else {
    suppPatientWin.show();
  }
}
//Create the aff patient window
function createAfficherPatientsWindow() {
  if (!affPatientsWindow) {
    affPatientsWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
      },
      width: 600,
      height: 600,
      title: "Afficher tous les patients",
    });
    affPatientsWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "renderer", "affPatients.html"),
        protocol: "file:",
        slashes: true,
      })
    );
    // Handle garbage collection
    affPatientsWindow.on("close", function () {
      affPatientsWindow = null;
    });
  } else {
    affPatientsWindow.show();
  }
}

// add-patient from add patient window
ipcMain.on("item:add", function (event, patient) {
  const updatedPatients = patientsData.addPatient(patient);
  if (affPatientsWindow) {
    affPatientsWindow.reload();
    if(addPatientWin){
      addPatientWin.close();
    }
    
  }
  
});

// delete-patient from delete patient window
ipcMain.on("item:supp", function (event, patient) {
  const pat = patient.toString();
  const updatedPatients = patientsData.deletePatient(pat, patientsData);
  if (affPatientsWindow) {
    affPatientsWindow.reload();
  }
  suppPatientWin.close();
});
//close the affPatientsWindow
ipcMain.on("btn:fermer", () => {
  affPatientsWindow.close();
});
ipcMain.on('printRDV1', (event,rdv) => {
  if (!affRDVPrint) {
    affRDVPrint = new BrowserWindow ({

      webPreferences: {
        nodeIntegration: true,

      },
      width: 500,
      height: 350,
      title: "Afficher un RDV",
    });
    affRDVPrint.loadURL(
      url.format({
        pathname: path.join(__dirname,"renderer" ,"printRDV.html"),
        protocol: "file:",
        slashes: true,
      })
    );
    
    // Handle garbage collection
    affRDVPrint.on("close", function () {
      affRDVPrint = null;
    });
    
  } 
  else {
    affRDVPrint.show();
  }
  
});
print.on("print-rdv",function(rdv){
  console.log("pppppp");
  print_rdv=rdv;
  console.log("pppppp");
})
ipcMain.on('print2',function(event,print){
  affRDVPrint.send('print1')
})
//create the mainMenuTemplate
const mainMenuTemplate = [
  // Each object is a dropdown
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    label: "Patient",
    submenu: [
      {
        label: "Ajouter Patient",
        click() {
          createAddPatientWindow();
        },
      },
      {
        label: "Supprimer Patient",
        click() {
          createSuppPatientWindow();
        },
      },
      {
        label: "Afficher la liste des patients",
        click() {
          createAfficherPatientsWindow();
        },
      },
    ],
  },
];
ipcMain.on("rdv:add", function (event, rdv) {
  RDVManager.addRDV(rdv);
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let year = rdv.dateTime.slice(0, 4);
  let month = rdv.dateTime.slice(5, 7);
  let day = rdv.dateTime.slice(8, 10);
  if (day == dd && month == mm && year == yyyy) {
    console.log("rdv today1");
    mainWindow.webContents.send("rdv:add", rdv);
    console.log("rdv today3");
  }
  console.log(RDVManager.rdvList);
});

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
