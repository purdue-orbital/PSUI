const { BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require("path");

const { buildMenu } = require('../functionality/Menu.js');
const GraphWindowAPI = require('./GraphWindow.js');
const Window = require('./Window.js');
const DataState = require('../functionality/DataState.js');


class MainWindow extends Window {
  static instance = null;
  __window = null;
  __dataInterval = null;

  constructor() {
    super();
  }

  launch() {
    // Create the browser window.
    this.__window = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 692,
      minHeight: 590,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    // Constructs custom toolbar for main window
    buildMenu(this.__window.id);

    // If dev mode bring up dev tools
    if (isDev) { this.__window.webContents.openDevTools({ mode: 'detach' }); }

    // Set an interval to fetch data and send to rendering proccess
    this.__dataInterval = setInterval(() => {
      this.__window.webContents.send("RequestData", DataState.getInstance().getCurrData());
    }, 1000);
    
    // Window actions
    this.__window.on('close', () => {
      GraphWindowAPI.closeWindow();
      clearInterval(this.__dataInterval);
      this.__dataInterval = null;
      this.__window = null;
    });

    // and load the index.html of the app.
    this.__window.loadURL(
      isDev ?
        'http://localhost:3000' :
        `file://${path.join(__dirname, "../build/index.html")}`
    );
  }

  close() {
    // Close the window if exists
    // Only called if called by api
    if (this.__window !== null) {
      this.__window.close();
    }
  }

  static getInstance() {
    if (MainWindow.instance === null) {
      MainWindow.instance = new MainWindow();
    }
    return MainWindow.instance;
  }

  static launchWindow() {
    MainWindow.getInstance().launch();
  }

  static closeWindow() {
    MainWindow.getInstance().close();
  }
}

const MainWindowAPI = {
  openWindow: MainWindow.launchWindow,
  closeWindow: MainWindow.closeWindow,
}

module.exports = MainWindowAPI;
