import { Logger } from "../libs/logger.js";
import { AppConfig } from "../config/app.config.js";

export const logRequestMiddleware = (req, res, next) => {
  if (AppConfig.server.logger !== "debug") return next();

  Logger.warn(`${req.method}: '${req.path}'`);
  next();
};
