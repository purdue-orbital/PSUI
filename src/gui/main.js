const { app, BrowserWindow } = require('electron');

function createWindow() {
   // create window.
   const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
         nodeIntegration: true
      }
   });

   // load the index.html
   win.loadFile('./app/html/index.html');

   // how to open the dev tools on launch if you want
   // win.webContents.openDevTools();
}

// create window after electron innits
app.whenReady().then(createWindow);

// quit when all windows are closed
app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit();
   }
});

//TODO: Everything else
