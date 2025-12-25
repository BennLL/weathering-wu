import { app } from "./app.js";
import dotenv from "dotenv";
import { initDatabase } from "./db/init.js";

dotenv.config();

try {
  await initDatabase();
  const PORT = process.env.PORT || 8080;

  app.listen(PORT);
  console.info(`express server running on http://localhost:${PORT}`);
} catch (e) {
  console.error("error: ", e);
}
