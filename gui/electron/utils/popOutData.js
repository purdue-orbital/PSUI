const { app, BrowserWindow } = require('electron');



class PopOutDataSingleton {
  static dataWindow = null;

  static getWindow(winId) {
    if (PopOutDataSingleton.dataWindow == null) {
      PopOutDataSingleton.dataWindow = new PopOutData();
    }
    PopOutDataSingleton.dataWindow.launchPopOutData(winId);
  }
}

class PopOutData {

  __isOpen = false;
  __window = null;

  launchPopOutData(winId) {
    // Get the window
    if (this.__window == null) {
      this.__window = BrowserWindow.fromId(winId);
    }

    // Actually do a thing
    if (this.__isOpen) {
      // TODO: Bring window to front
      this.__isOpen = false;
      console.log("CLOSED!!");
    } else {
      this.__isOpen = true;
      console.log("OPENED!!");
    }
  }
}

module.exports = {
  launchPopOutData: PopOutDataSingleton.getWindow,
};
