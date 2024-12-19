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
      const result = await dbInstance.run(
        `INSERT INTO taskLists (id, title) VALUES (?, ?)`,
        [id, title]
      );
      if (result.changes) return { listId: id, title: title, tasks: [] };
      else return null;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  ipcMain.handle("deleteTaskList", async (event, listId) => {
    try {
      const result = await dbInstance.run(
        `DELETE FROM taskLists WHERE id = ?`,
        [listId]
      );
      if (result.changes) return listId;
      else return null;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  ipcMain.handle("addTask", async (event, task) => {
    const { id, text, listID } = task;
    const result = await dbInstance.run(
      `INSERT INTO tasks (id, text, listID) VALUES (?, ?, ?)`,
      [id, text, listID]
    );
    if (result.changes) return task;
    else return null;
  });

  ipcMain.handle("completeTask", async (event, task) => {
    try {
      const { taskId, completed } = task;
      const result = await dbInstance.run(
        `UPDATE tasks SET completed=? WHERE id=?`,
        [!completed, taskId]
      );
      if (result.changes) return { taskId, completed: !completed };
      else return null;
    } catch (error) {
      console.error(error);
      throw error
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
