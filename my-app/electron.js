const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "dist", "index.html"));
  win.webContents.openDevTools(); // Optional: shows debugging info
}

ipcMain.handle("get-csv-data", async () => {
  const csvPath = path.join(__dirname, "students.csv");
  return fs.readFileSync(csvPath, "utf8");
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
