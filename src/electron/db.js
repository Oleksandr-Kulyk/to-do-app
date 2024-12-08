import { app } from "electron";
import pkg from "sqlite3";
import { open } from "sqlite";

const { Database } = pkg;

const initDB = async () => {
  try {
    const db = await open({
      filename: path.join(app.getPath("userData"), "app.db"),
      driver: Database,
    });
    console.log("connected to db");
    await db.exec(`CREATE TABLE IF NOT EXISTS tasks (
        id TEXT NOT NULL UNIQUE,
        text TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT FALSE
    )`);
    return db;
  } catch (err) {
    console.log(`An error occured ${err.message}`);
    throw err;
  }
};

export default initDB;
