import { ipcMain } from "electron";
import { sortTaskRows } from "../utils/utils.js";

const configureIPC = async (dbInstance) => {
  ipcMain.handle("getTaskLists", async (event) => {
    try {
      const rows = await dbInstance.all(
        "SELECT taskLists.id as listId, taskLists.title, tasks.id as taskId, tasks.text, tasks.completed, tasks.listID FROM taskLists LEFT JOIN tasks ON taskLists.id=tasks.listID"
      );
      const lists = sortTaskRows(rows);
      return lists;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  ipcMain.handle("addTaskList", async (event, taskList) => {
    try {
      const { id, title } = taskList;
      await dbInstance.run(`INSERT INTO taskLists (id, title) VALUES (?, ?)`, [
        id,
        title,
      ]);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  ipcMain.handle("addTask", async (event, task) => {
    const { id, text } = task;
    await dbInstance.run(`INSERT INTO tasks (id, text) VALUES (?, ?)`, [
      id,
      text,
    ]);
    return dbInstance.get(`SELECT * FROM tasks WHERE id=?`, [id]);
  });

  ipcMain.handle("getAllTasks", async (event) => {
    const allTasks = await dbInstance.all("SELECT * FROM tasks");
    return allTasks;
  });

  ipcMain.handle("completeTask", async (event, task) => {
    try {
      const { id, completed } = task;
      await dbInstance.run(`UPDATE tasks SET completed=? WHERE id=?`, [
        !completed,
        id,
      ]);
      return await dbInstance.all("SELECT * FROM tasks");
    } catch (error) {
      console.error(error);
    }
  });

  ipcMain.handle("editTask", async (event, task) => {
    try {
      const { id, text } = task;
      await dbInstance.run(`UPDATE tasks SET text=? WHERE id=?`, [text, id]);
      return await dbInstance.all("SELECT * FROM tasks");
    } catch (error) {
      console.error(error.message);
    }
  });

  ipcMain.handle("deleteTask", async (event, taskId) => {
    await dbInstance.run(`DELETE FROM tasks WHERE id=?`, [taskId]);
    return await dbInstance.all("SELECT * FROM tasks");
  });
};

export default configureIPC;
