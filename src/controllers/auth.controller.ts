import type { Request, Response } from "express";
import * as authService from "../services/auth.service.ts";

export const register = async (req: Request, res: Response) => {
  const { email, password, phoneNumber } = req.body;
  try {
    const result = await authService.register(email, password, phoneNumber);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { phoneNumber, password } = req.body;
  try {
    const result = await authService.login(phoneNumber, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
