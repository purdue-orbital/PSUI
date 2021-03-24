const { BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require("path");
const DataState = require("../functionality/DataState.js");

class GraphWindow {
  static instance = null
  __window = null
  __data = DataState.getInstance();
  __dataInterval = null;

  launch() {
    if (this.__window == null) {
      // Window not yet made -> Create and open
      this.__window = new BrowserWindow({
        webPreferences: {
          nodeIntegration: true,
        },
      });

      // No menu on this window please
      this.__window.removeMenu();

      // Dev tools are luanched in dev mode
      if (isDev) { this.__window.webContents.openDevTools({ mode: 'detach' }); }
      
      // Fetch random data every second and send to render proccess
      this.__dataInterval = setInterval(() => {
        this.__window.webContents.send("RequestData", this.__data.getCurrData());
      }, 1000);
      
      this.__window.on('close', () => {
        // Window is closing
        // Stop fetching data and null instance vars
        clearInterval(this.__dataInterval);
        this.__dataInterval = null;
        this.__window = null;
      });

      this.__window.loadURL(isDev ?
        "http://localhost:3000/#/multigraph" :
        `file://${path.join(__dirname, "../../build/index.html#/multigraph")}`
      );
    } else {
      // Window already opened, just bring to top
      this.__window.show();
    }
  }

  close() {
    // Close the window if it exists
    // NOTE: This method is called only when the API - close method is invoked
    if (this.__window !== null) {
      this.__window.close();
    }
  }

  // Static Methods for controlling the window
  static launchWindow() {
    GraphWindow.getInstance().launch();
  }

  static closeWindow() {
    GraphWindow.getInstance().close();
  }

  static getInstance() {
    if (GraphWindow.instance == null) {
      GraphWindow.instance = new GraphWindow();
    }
    return GraphWindow.instance;
  }
}

const GraphWindowAPI = {
  openWindow: GraphWindow.launchWindow,
  closeWindow: GraphWindow.closeWindow,
};

module.exports = GraphWindowAPI;
