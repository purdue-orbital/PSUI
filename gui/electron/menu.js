const { Menu } = require('electron');

function buildMenu(window) {
  const template = [
    {
      label: 'Graph',
      submenu: makeChangeGraphMenu(window),
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function makeChangeGraphMenu(window) {
  return getDataKeys().map(graphName => {
    return {
      label: graphName,
      click: () => { window.webContents.send("ChangeGraph", {newGraph: graphName})},
    };
  })
}

function getDataKeys() {
  // TODO: This needs to read data object and return keys so we do not have to update manually
  return ["Altitude", "Longitude", "Latitude", "Gyro", "Temperature", "Acceleration"];
}

module.exports = {
  buildMenu: buildMenu,
};
