const { app, BrowserWindow } = require('electron');



class PopOutDataSingleton {
  static dataWindow = null;

  static getWindow() {
    if (PopOutDataSingleton.dataWindow == null) {
      PopOutDataSingleton.dataWindow = new PopOutData();
    }
    PopOutDataSingleton.dataWindow.launchPopOutData();
  }
}

class PopOutData {

  __isOpen = false;

  createPopOutData() {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 692,
      minHeight: 590,
      webPreferences: {
        nodeIntegration: true
      },
    });

    // and load the html for the popout window
    win.loadURL("https://github.com/purdue-orbital/PSUI/");
  }

  launchPopOutData() {
    if (this.__isOpen) {
      // TODO: Bring window to front
    } else {
      this.__isOpen = true;
      app.whenReady().then(this.createPopOutData);
      app.on('window-all-closed', () => { 
        app.quit();
      });
    }
  }
}




module.exports = {
  launchPopOutData: PopOutDataSingleton.getWindow,
};
