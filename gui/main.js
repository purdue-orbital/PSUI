const { app, BrowserWindow } = require('electron');

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 692,
    minHeight: 519,
    webPreferences: {
      nodeIntegration: true
    },
  });

  // and load the index.html of the app.
  win.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow);
