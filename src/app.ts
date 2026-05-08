import express from "express";
import swaggerUi from "swagger-ui-express";

import authRoutes from "./modules/auth/auth.routes.ts";
import { swaggerDocument } from "./config/swagger.ts";
import { loggerMiddleware } from "./middleware/logger.middleware.ts";

import { errorHandler } from "./middleware/error.middleware.ts";


const app = express();

// Middleware
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.get("/", (req, res) => {
  res.redirect("/docs");
});
app.use("/api/auth", authRoutes);

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// error handlers must be last
app.use(errorHandler);

export default app;