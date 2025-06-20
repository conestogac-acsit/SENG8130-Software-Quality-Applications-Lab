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
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  const template = [
    ...(process.platform === 'darwin'
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideOthers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' },
            ],
          },
        ]
      : []),
    {
      label: 'File',
      submenu: [
        {
          label: 'Home',
          click: (_, browserWindow) => {
            if (!browserWindow) return;
            if (isDev) {
              browserWindow.loadURL('http://localhost:5173/');
            } else {
              browserWindow.loadFile(
                path.join(__dirname, '../dist/index.html'),
                { hash: '' }
              );
            }
          },
        },
        { label: 'Reload App', role: 'reload' },
        { label: 'Exit', role: 'quit' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { label: 'Toggle Full Screen', role: 'togglefullscreen' },
        { label: 'Open Developer Tools', role: 'toggleDevTools' },
      ],
    },
    {
      label: 'Modules',
      submenu: [
        {
          label: 'Automation Tool',
          click: (_, browserWindow) => {
            if (!browserWindow) return;
            if (isDev) {
              browserWindow.loadURL('http://localhost:5173/not-found');
            } else {
              browserWindow.loadFile(
                path.join(__dirname, '../dist/index.html'),
                { hash: 'not-found' }
              );
            }
          },
        },
        {
          label: 'Test Reports',
          click: (_, browserWindow) => {
            if (!browserWindow) return;
            if (isDev) {
              browserWindow.loadURL('http://localhost:5173/not-found');
            } else {
              browserWindow.loadFile(
                path.join(__dirname, '../dist/index.html'),
                { hash: 'not-found' }
              );
            }
          },
        },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About SQATE',
          click: () =>
            dialog.showMessageBox({
              type: 'info',
              title: 'About SQATE',
              message: 'SQATE Desktop App\nVersion 1.0.0',
              buttons: ['OK'],
            }),
        },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
