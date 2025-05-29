const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readCSV: (path) => ipcRenderer.invoke('read-csv', path),
  writeCSV: (payload) => ipcRenderer.invoke('write-csv', payload),
  sendMails: (payload) => ipcRenderer.invoke('send-mails', payload),
});
console.log("preload.js loaded")
