import { transporter } from "../../config/mail.ts";

export const sendVerifyEmail = async (email: string, token: string) => {
  const verifyUrl = `${process.env.BACKEND_URL}/api/auth/verify-email/${token}`;

  await transporter.sendMail({
    from: `"My App" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Verify Your Email",
    html: `
    <div>
      <h2>Email Verification</h2>

      <p>Click the button below to verify your account:</p>

      <a
        href="${verifyUrl}"
        target="_blank"
        style="
          display:inline-block;
          padding:12px 20px;
          background:#000;
          color:#fff;
          text-decoration:none;
          border-radius:6px;
        "
      >
        Verify Email
      </a>

      <p style="margin-top:20px;">
        Or copy this link:
      </p>

      <p>
        ${verifyUrl}
      </p>
    </div>
  `,
  });
};
