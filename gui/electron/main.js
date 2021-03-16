const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require("path");

const { buildMenu } = require('./functionality/menu.js');
const { GraphWindowAPI } = require('./ChildWindows/GraphWindow.js');
const getData = require('./functionality/getData.js');

class MainWindow {
  static createMainWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 692,
      minHeight: 590,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    buildMenu(win.id);

    if (isDev) { win.webContents.openDevTools({ mode: 'detach' }); }

    // Window actions
    win.on('close', () => {
      GraphWindowAPI.closeWindow();
    });

    // and load the index.html of the app.
    win.loadURL(
      isDev ?
        'http://localhost:3000' :
        `file://${path.join(__dirname, "../build/index.html")}`
    );
  }
}

app
  .whenReady()
  .then(getData.getInstance().startRandomData())
  .then(MainWindow.createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
});
