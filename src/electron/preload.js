const { contextBridge, ipcRenderer } = require("electron");

console.log("Preload script loaded!");

contextBridge.exposeInMainWorld("tasksAPI", {
  addTask: (task) => ipcRenderer.invoke("addTask", task),
});
