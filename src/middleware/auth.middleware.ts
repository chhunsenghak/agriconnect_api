import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ResponseBuilder } from "../utils/response-builder.ts";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json(ResponseBuilder.error("Access token required"));
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json(ResponseBuilder.error("Invalid or expired token"));
  }
};
