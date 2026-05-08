import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/app-error.ts";
import { ResponseBuilder } from "../utils/response-builder.ts";
import { logger } from "../utils/logger.ts";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Zod validation error
  if (err instanceof ZodError) {
    return res.status(400).json(
      ResponseBuilder.error(
        "Validation Error",
        err.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }))
      )
    );
  }

  // AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(
      ResponseBuilder.error(
        err.message,
        err.errors
      )
    );
  }

  // Unknown error
  logger.error(err instanceof Error ? err.message : String(err));

  return res.status(500).json(
    ResponseBuilder.error(
      "Internal Server Error"
    )
  );
};