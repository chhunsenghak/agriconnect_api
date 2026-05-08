import jwt from "jsonwebtoken";

export const generateVerifyToken = (
  id: string,
  email: string
) => {
  return jwt.sign(
    { id, email },
    process.env.JWT_VERIFY_SECRET!,
    {
      expiresIn: "1h",
    }
  );
};