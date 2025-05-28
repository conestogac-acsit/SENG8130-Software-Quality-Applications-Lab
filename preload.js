// preload.js
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  // You can add secure APIs later here if needed
});
