const { BrowserWindow } = require('electron');

class PopOutData {

  static instance = null
  __isOpen = false;

  launchPopOutData(winId) {
    // Get main window
    const parent = BrowserWindow.fromId(winId);

    // Actually do a thing
    if (this.__isOpen) {
      // TODO: Bring window to front
    } else {
      this.__isOpen = true;
      const child = new BrowserWindow({
        parent: parent,
      });
      child.on('close', () => { this.__isOpen = false; });
      child.loadURL("https://github.com/purdue-orbital/PSUI/");
    }
  }

  static getWindow(winId) {
    if (PopOutData.instance == null) {
      PopOutData.instance = new PopOutData();
    }
    PopOutData.instance.launchPopOutData(winId);
  }
}

module.exports = {
  launchPopOutData: PopOutData.getWindow,
};
