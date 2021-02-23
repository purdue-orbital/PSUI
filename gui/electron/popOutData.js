const { app, BrowserWindow } = require('electron');


function createPopOutData() {
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


function launchPopOutData() {
  app.whenReady().then(createPopOutData);
  app.on('window-all-closed', () => { app.quit() });
}

module.exports = {
  launchPopOutData: launchPopOutData,
};
