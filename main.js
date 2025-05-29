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

ipcMain.handle('read-csv', async (_, filePath) => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
});

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


ipcMain.handle('send-mails', async (_, { sender, password, recipients, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: sender, pass: password },
  });

  const results = [];
  for (const recipient of recipients) {
    try {
      await transporter.sendMail({
        from: sender,
        to: recipient,
        subject,
        text: message,
      });
      results.push({ recipient, status: 'Sent' });
    } catch (e) {
      results.push({ recipient, status: 'Failed', error: e.message });
    }
  }
  return results;
});
