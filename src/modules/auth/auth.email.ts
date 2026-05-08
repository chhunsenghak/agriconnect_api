import { transporter } from "../../config/mail.ts";

export const sendVerifyEmail = async (
  email: string,
  token: string
) => {
  const verifyUrl =
    `${process.env.BACKEND_URL}/api/auth/verify-email/${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Verify Your Email",
    html: `
      <h2>Email Verification</h2>

      <p>Click below to verify your account</p>

      <a href="${verifyUrl}">
        Verify Email
      </a>
    `,
  });
};