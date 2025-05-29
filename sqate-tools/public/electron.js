const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;
function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    title: 'SQATE Tools',
    icon: path.join(__dirname, 'assets', 'logo.ico'),
    webPreferences: {
      contextIsolation: true,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:3000'); // React dev server
  } else {
    win.loadFile(path.join(__dirname, '../build/index.html')); // Production build
  }
  win.loadFile(path.join(__dirname, '../build/index.html'));

  // Define the custom top menu template
  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Reload App',
          role: 'reload',
        },
        {
          label: 'Exit',
          role: 'quit',
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Full Screen',
          role: 'togglefullscreen',
        },
        {
          label: 'Open Developer Tools',
          role: 'toggleDevTools',
        },
      ],
    },
    {
      label: 'Modules',
      submenu: [
        {
          label: 'Automation Tool',
          click: () => {
            console.log('Automation Tool clicked');
          },
        },
        {
          label: 'Test Reports',
          click: () => {
            console.log('Test Reports clicked');
          },
        },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About SQATE',
          click: () => {
            dialog.showMessageBox({
              type: 'info',
              title: 'About SQATE',
              message: 'SQATE Desktop App\nVersion 1.0.0',
              buttons: ['OK'],
            });
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
