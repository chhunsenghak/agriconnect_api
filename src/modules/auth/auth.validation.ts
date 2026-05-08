import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  phoneNumber: z.string().min(8),
  address: z.string().min(3),
  roleId: z.number(),
  profileImage: z.string().url().optional(),
});

export const loginSchema = z.object({
  phoneNumber: z.string(),
  password: z.string(),
});