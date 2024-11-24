import initDB from "./db.js";
import { ipcMain } from "electron";

const configureIPC = async () => {
  const db = await initDB();

  ipcMain.handle("addTask", async (event, task) => {
    const { id, text } = task;
    const newTask = await db.run(`INSERT INTO tasks (id, text) VALUES (?, ?)`, [
      id,
      text,
    ]);
    return newTask;
  });
};

export default configureIPC;
