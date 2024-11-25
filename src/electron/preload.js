const { contextBridge, ipcRenderer } = require("electron");

console.log("Preload script loaded!");

contextBridge.exposeInMainWorld("tasksAPI", {
  addTask: (task) => ipcRenderer.invoke("addTask", task),
  getAllTasks: () => ipcRenderer.invoke('getAllTasks'),
  completeTask: (task) => ipcRenderer.invoke('completeTask', task),
  editTask: task => ipcRenderer.invoke('editTask', task),
  deleteTask: (taskId) => ipcRenderer.invoke('deleteTask', taskId)
});
