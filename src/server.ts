import dotenv from "dotenv";
import app from "./app.ts";
import sequelize from "./config/database.ts";
import { logger } from "./utils/logger.ts";
import "./database/models/index.ts";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    logger.info("Database connected");

    await sequelize.sync();
    logger.info("Database synced");

    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error(`Startup error: ${error}`);
    process.exit(1);
  }
}

startServer();