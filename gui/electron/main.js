const { app, BrowserWindow } = require('electron');

const MainWindowAPI = require('./windows/MainWindow.js');
const DataState = require('./functionality/DataState.js');

app
  .whenReady()
  .then(() => DataState.getInstance().setTestMode(false))
  .then(MainWindowAPI.openWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    MainWindowAPI.closeWindow();
    app.quit()
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    MainWindow.createMainWindow()
  }
});
