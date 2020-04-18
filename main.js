// that's the entry point for our app
const electron = require("electron");
const path = require("path");
const url = require("url");

// SET ENV
process.env.NODE_ENV = "development";

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addRdvWindow;
// Listen for app to be ready
app.on("ready", function () {
  // Create new window
  mainWindow = new BrowserWindow({
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
    // save the list of rdv before closing, I donno how to do that but maybe it should send a msg another process of something..
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
    width: 600,
    height: 600,
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
const mainMenuTemplate = [];
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
