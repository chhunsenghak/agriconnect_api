import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDAO } from "./auth.repository.ts";
import { UserDTO, AuthResponseDTO } from "./user.dto.ts";
import { AppError } from "../../utils/app-error.ts";
import { generateVerifyToken } from "../../utils/generate-token.ts";
import { sendVerifyEmail } from "./auth.email.ts";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const generateTokens = (userId: string) => ({
  accessToken: jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" }),
  refreshToken: jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" }),
});

export const register = async (
  email: string,
  password: string,
  phoneNumber: string,
  address: string,
  roleId: number,
  profileImage: string,
): Promise<AuthResponseDTO> => {
  if (await UserDAO.findByPhoneNumber(phoneNumber)) {
    throw new AppError("PHONE_NUMBER_ALREADY_EXISTS", 409);
  }

  if (await UserDAO.findByEmail(email)) {
    throw new AppError("EMAIL_ALREADY_EXISTS", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserDAO.create(
    email,
    hashedPassword,
    phoneNumber,
    address,
    roleId,
    profileImage,
  );

  const token = generateVerifyToken(
    user.id,
    user.email
  );

  try{
    const test = await sendVerifyEmail(user.email, token);
  } catch(error) {
    await user.destroy();
    console.error("Email send failed:", error);
  }

  return { user: UserDTO.toDTO(user) };
};

export const login = async (
  phoneNumber: string,
  password: string,
): Promise<AuthResponseDTO> => {
  const user = await UserDAO.findByPhoneNumber(phoneNumber);
  if (!user) {
    throw new AppError("USER_NOT_FOUND", 404);
  }

  if (!user.isVerified) {
    throw new AppError("PLS_VERIFY_YOUR_EMAIL", 404);
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.toJSON().password,
  );

  if (!isPasswordValid) {
    throw new AppError("INVALID_PASSWORD", 400);
  }

  const { accessToken } = generateTokens(user.id);

  return { user: UserDTO.toDTO(user), accessToken };
};

export const verifyEmailService = async (
  token: string
) => {
  const decoded = jwt.verify(
    token,
    process.env.JWT_VERIFY_SECRET!
  ) as {
    id: number;
    email: string;
  };

  const user = await UserDAO.findById(decoded.id);

  if (!user) {
    throw new AppError("USER_NOT_FOUND", 404);
  }

  const { accessToken, refreshToken } = generateTokens(user.id);
  await UserDAO.update(user.id, { token: refreshToken, isVerified: true });

  return {user: UserDTO.toDTO(user), accessToken};
};