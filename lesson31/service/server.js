import mongoose from "mongoose";
import { Logger } from "./libs/logger.js";
import { AppConfig } from "./config/app.config.js";
import { app } from "./src/index.js";

const { port, hostname } = AppConfig.server;
const { connectionString } = AppConfig.db;

mongoose.connect(connectionString);

const db = mongoose.connection;

db.on("error", (error) => {
  Logger.error(`Connection error: ${JSON.stringify(error)}`);
});
db.on("open", () => {
  Logger.info("Connected to MongoDB is opened 🐾🐾🐾 ");
});

app.listen(port, hostname, () => {
  Logger.info(`Server is serving on http://${hostname}:${port}`);
  Logger.info(
    `Swagger documentation is serving on http://${hostname}:${port}/api`
  );
});
