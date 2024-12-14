import { app } from "electron";
import pkg from "sqlite3";
import { open } from "sqlite";
import path from "path";

const { Database } = pkg;

const initDB = async () => {
  try {
    const db = await open({
      filename: path.join(app.getPath("userData"), "app.db"),
      driver: Database,
    });
    console.log("connected to db");
    await db.exec("PRAGMA foreign_keys = ON;");
    const foreignKeysStatus = await db.get("PRAGMA foreign_keys;");
console.log("Foreign keys status:", foreignKeysStatus);
    await db.exec(`CREATE TABLE IF NOT EXISTS taskLists (
      id  TEXT PRIMARY KEY NOT NULL UNIQUE,
      title TEXT NOT NULL
    )`);
    await db.exec(`CREATE TABLE IF NOT EXISTS tasks (
      id TEXT NOT NULL UNIQUE,
      text TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT FALSE,
      listID TEXT NOT NULL,
      FOREIGN KEY (listID) REFERENCES taskLists (id) ON DELETE CASCADE
  )`);
    return db;
  } catch (err) {
    console.log(`An error occured ${err.message}`);
    throw err;
  }
};

export default initDB;
