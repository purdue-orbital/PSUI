const { BrowserWindow } = require('electron');

class GraphWindow {
  static instance = null
  __window = null

  launch() {
    if (this.__window == null) {
      // Window not yet made -> Create and open
      this.__window = new BrowserWindow();
      this.__window.removeMenu();
      this.__window.on('close', () => { this.__window = null; });
      this.__window.loadURL("https://github.com/purdue-orbital/PSUI/");
    } else {
      // Window already opened, just bring to top
      this.__window.show();
    }
  }

  close() {
    if (this.__window != null) {
      this.__window.close();
    }
  }

  // Static Methods for controlling the window
  static launchWindow(winId) {
    GraphWindow.getInstance().launch(winId);
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

module.exports = { GraphWindowAPI };
