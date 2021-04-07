const { ipcMain } = require('electron');
const DataState = require('../functionality/DataState.js');

class Window {
  constructor() {
    ipcMain.on("SetUpReq", (event) => {
      const data = DataState.getInstance();
      event.returnValue = {
        currData: DataState.defaultData,
        isTestMode: data.isTestMode()
      };
    });
  }
}

module.exports = Window;