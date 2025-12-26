import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/users.js";

const app = express();

app.use(cors());
app.use(express.json());
userRoutes(app)

app.get("/", (req, res) => {
  res.send("Backend running");
});

export { app };