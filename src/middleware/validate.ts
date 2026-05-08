import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { ResponseBuilder } from "../utils/response-builder.ts";

export const validate =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return res.status(400).json(ResponseBuilder.error("Validation failed", errors));
    }

    req.body = result.data;
    next();
  };
