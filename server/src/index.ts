import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import startup from "./utils/startup";
import * as Routes from "./routes";
import Logger from "./utils/logger";


dotenv.config();


const logger = new Logger("index");
const app = express();
const port = process.env.PORT;


const VERSION = 'v1';
const BASE_PATH = `/api/${VERSION}`;


app.use(cors());
app.use(express.json());

for (const route in Routes) {
  const router = {...Routes}[route]
  if (router) {
    app.use(`${BASE_PATH}/${route}`, router);
  }
}


app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

startup.then(() => {
  app.listen(port, () => {
    logger.log(`Server is running at http://localhost:${port}`);
    // console.log(`[server]: Server is running at http://localhost:${port}`);
  });
});
