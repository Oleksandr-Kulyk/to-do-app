import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import configureIPC from "./ipcConfig.js";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const createWindow = async () => {
  let window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  window.loadURL("http://localhost:5173/");
  window.on("closed", () => {
    window = null;
  });
};

app.whenReady().then(async () => {
  configureIPC();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
