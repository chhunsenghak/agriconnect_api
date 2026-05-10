import type { Request, Response } from "express";
import * as authService from "./auth.service.ts";
import { asyncHandler } from "../../utils/async-handler.ts";
import { ResponseBuilder } from "../../utils/response-builder.ts";


// ============================================== //
//               Register Controller              //
// ============================================== //
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, phoneNumber, address, roleId, profileImage } =
    req.body;
  await authService.register(
    email,
    password,
    phoneNumber,
    address,
    roleId,
    profileImage,
  );
  res
    .status(201)
    .json(
      ResponseBuilder.created("Account created. Please verify your email."),
    );
});


// ============================================== //
//                logout Controller               //
// ============================================== //
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { phoneNumber, password } = req.body;
  const result = await authService.login(phoneNumber, password);
  res.status(200).json(ResponseBuilder.success("Login successful", result));
});


// ============================================== //
//                Logout Controller               //
// ============================================== //
export const logout = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.user as { id: string })?.id;
  await authService.logout(userId);
  res.status(200).json(ResponseBuilder.success("Logout successful"));
});


// ============================================== //
//                Logout Controller               //
// ============================================== //
export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.user as { id: string })?.id;
  const user = await authService.currentUser(userId);
  res.status(200).json(ResponseBuilder.success("Current User Info", user));
});

// ============================================== //
//            Verify Email Controller             //
// ============================================== //
export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.verifyEmailService(
    Array.isArray(req.params.token) ? req.params.token[0] : req.params.token,
  );

  res.status(200).json(ResponseBuilder.success("Verify", result));
});
