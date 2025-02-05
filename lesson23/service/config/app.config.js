import "dotenv/config";

export const AppConfig = {
  server: {
    port: Number(process.env.PORT) || 4000,
    hostname: process.env.HOST_NAME ?? "localhost",
    logger: process.env.LOGGER_LEVEL ?? "info",
  },
  db: {
    connectionString: process.env.MONGO_CONNECTION_STRING ?? "",
  },
};
