import express from "express";
import dotenv from "dotenv";

import { createLogger, format, transports, addColors } from "winston";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import sequelize from "./config/database.ts";
import authRoutes from "./routes/auth.routes.ts";
const { combine, timestamp, colorize, printf } = format;
import path from "path";
import { fileURLToPath } from "url";

// Define custom log levels and colors
const myCustomLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4
  },
  colors: {
    fatal: 'magenta',
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue'
  }
};
addColors(myCustomLevels.colors);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Agriculture API",
      version: "1.0.0",
      description: "API for managing agricultural data and operations"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      { bearerAuth: [] }
    ],
  },
  apis: [
    path.join(__dirname, "routes", "*.ts"),
    path.join(__dirname, "routes", "*.js"),
  ],  
};
const swaggerDocument = swaggerJsDoc(swaggerOptions);


// Configure winston logger
const logger = createLogger({
  level: "info",
  levels: myCustomLevels.levels,
  format: combine(
    colorize({ all: true }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/app.log" }),
  ],
});

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Serve Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", authRoutes);

// Start the server and connect to the database
async function startServer() {
  try {
    await sequelize.authenticate();
    logger.info("Database connection has been established successfully.");

    await sequelize.sync();
    logger.info("All models were synchronized successfully.");

    app.listen(port, () => {
      logger.info(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    logger.error(`Unable to connect to the database: ${error}`);
  }
}

startServer();