import { ipcMain } from "electron";

const configureIPC = async (dbInstance) => {
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
