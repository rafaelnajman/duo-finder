import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes";

const app = express();
app.use(cors());

app.use(express.json());

app.use(router);

app.listen(3333, () => {
  console.log("Server listening on port 3333");
});
