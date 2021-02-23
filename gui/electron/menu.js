const { Menu } = require('electron');

function buildMenu(window) {
  const template = [
    {
      label: 'Graph',
      submenu: makeChangeGraphMenu(window),
    },
    {
      label: 'Data',
      submenu: [
        {
          label: "Pop Out Data",
          click: () => { console.log("FIXME!!"); },
        },
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function makeChangeGraphMenu(window) {
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
  return ["Altitude", "Longitude", "Latitude", "Gyro", "Temperature", "Acceleration"];
}

module.exports = {
  buildMenu: buildMenu,
};
