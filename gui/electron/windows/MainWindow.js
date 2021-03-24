const { BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require("path");

const { buildMenu } = require('../functionality/Menu.js');
const GraphWindowAPI = require('./GraphWindow.js');
const DataState = require('../functionality/DataState.js');


class MainWindow {
  static randDataInt = null;

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

    // Constructs custom toolbar for main window
    buildMenu(win.id);

    // If dev mode bring up dev tools
    if (isDev) { win.webContents.openDevTools({ mode: 'detach' }); }

    // Set an interval to fetch data and send to rendering proccess
    MainWindow.randDataInt = setInterval(() => {
      win.webContents.send("RequestData", DataState.getInstance().getCurrData());
    }, 1000);
    
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

module.exports = MainWindow;
