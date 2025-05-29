const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;
function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
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
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
