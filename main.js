import  { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as  fs from 'fs';
import * as  nodemailer from 'nodemailer';
import * as  csvParser from 'csv-parser';
import * as  fastCsv from'fast-csv';
import { fileURLToPath } from 'url';


// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL('http://localhost:5173'); // Vite dev server
}

app.whenReady().then(createWindow);

ipcMain.handle('write-csv', async (_, { filePath, data, append = false }) => {
  const flags = append ? 'a' : 'w';
  const ws = fs.createWriteStream(filePath, { flags });

  return new Promise((resolve, reject) => {
    fastCsv
      .write(data, { headers: !append }) // write headers only if not appending
      .pipe(ws)
      .on('finish', () => resolve('done'))
      .on('error', reject);
  });
});
