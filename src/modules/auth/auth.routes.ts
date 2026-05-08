import { Router } from "express";
import * as authController from "./auth.controller.ts";
import { validate } from "../../middleware/validate.ts";
import { registerSchema, loginSchema } from "./auth.validation.ts";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - phoneNumber
 *               - roleId
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@mail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               phoneNumber:
 *                 type: string
 *                 example: "1234567890"
 *               address:
 *                 type: string
 *                 example: "Phnome as .."
 *               roleId:
 *                 type: int
 *                 example: 2
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.post("/register", validate(registerSchema), authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - password
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "+85587652222"
 *               password:
 *                 type: string
 *                 example: Farmer@123
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", validate(loginSchema), authController.login);

router.get("/verify-email/:token", authController.verifyEmail);

export default router;
