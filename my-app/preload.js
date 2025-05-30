const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getCSVData: () => ipcRenderer.invoke("get-csv-data")
});
