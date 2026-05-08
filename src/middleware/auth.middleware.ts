import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ResponseBuilder } from "../utils/response-builder.ts";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json(ResponseBuilder.error("Access token required"));
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(403).json(ResponseBuilder.error("Invalid or expired token"));
  }
};
