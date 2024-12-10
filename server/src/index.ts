import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import startup from "./middleware/startupMiddleware";
import { GraderRouter, UserRouter } from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT;


const VERSION = 'v1';
const BASE_PATH = `/api/${VERSION}`;


app.use(cors());
app.use(express.json());
app.use(`${BASE_PATH}/user`, UserRouter);
app.use(`${BASE_PATH}/grader`, GraderRouter);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

startup.then(() => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
});
