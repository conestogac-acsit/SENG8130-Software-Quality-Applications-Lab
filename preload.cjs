const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  writeCSV: (payload) => ipcRenderer.invoke('write-csv', payload),
});
console.log("preload.js loaded")
