const { Menu, BrowserWindow } = require('electron');
const GraphWindowAPI = require('../windows/GraphWindow.js');
const DataState = require('./DataState.js');

function buildMenu(windowId) {
  const window = BrowserWindow.fromId(windowId);
  const template = [
    {
      label: 'Graph',
      submenu: makeChangeGraphMenu(windowId),
    },
    {
      label: 'Data',
      submenu: [
        {
          label: "Toggle Test Mode",
          click: () => {
            const data = DataState.getInstance();
            data.toggleTestMode();
            window.webContents.send("SetTestMode", data.isTestMode());
          },
        },
        {
          label: "Graphs Window",
          click: () => { GraphWindowAPI.openWindow(); },
        },
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function makeChangeGraphMenu(windowId) {
  const window = BrowserWindow.fromId(windowId);
  return getDataKeys().map((graphName, i) => {
    const hotkeynum = 1 + i;
    let accelerator = null;
    if (hotkeynum <= 10) { accelerator = `CommandOrControl+Shift+${hotkeynum % 10}`; }
    else if (hotkeynum <= 20) { accelerator = `CommandOrControl+Alt+${hotkeynum % 10}`; }
    else if (hotkeynum <= 30) { accelerator = `CommandOrControl+${hotkeynum % 10}`; }
    
    return {
      label: graphName,
      accelerator: accelerator,
      click: () => { window.webContents.send("ChangeGraph", {newGraph: graphName})},
    };
  })
}

function getDataKeys() {
  // TODO: This needs to read data object and return keys so we do not have to update manually
  // return ["Altitude", "Longitude", "Latitude", "Gyro", "Temperature", "Acceleration"];
  return DataState.getInstance().getDataFields();
}

module.exports = {
  buildMenu: buildMenu,
};
