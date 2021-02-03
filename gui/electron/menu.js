const { Menu, ipcMain } = require('electron');

function buildMenu(window) {
  const template = [
    {
      label: 'Graph',
      submenu: [
        {
          label: 'Gyro',
          click: () => {
            console.log("This is Main Proc");
            window.webContents.send("ChangeGraph", {newGraph: "Gyro"});
          },
        },
      ]
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

module.exports = {
  buildMenu: buildMenu,
};
