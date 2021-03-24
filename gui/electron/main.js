const { app, BrowserWindow } = require('electron');

const MainWindow = require('./windows/MainWindow.js');
const DataState = require('./functionality/DataState.js');

app
  .whenReady()
  .then(DataState.getInstance().setTestMode(false))
  .then(MainWindow.createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    clearInterval(MainWindow.randDataInt);
    app.quit()
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    MainWindow.createMainWindow()
  }
});
