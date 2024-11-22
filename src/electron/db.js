import {fileURLToPath} from 'url';
import path, { dirname } from 'path';
import pkg from "sqlite3";
import { open } from 'sqlite';

const {Database} = pkg;
const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

(async () => {
    try {
          const db = await open({
        filename: path.join(__dirname, 'app.db'),
        driver: Database
    });
    console.log('connected to db');
    await db.close();
    } catch(err) {
        console.log(`An error occured ${err.message}`)
    }

})()