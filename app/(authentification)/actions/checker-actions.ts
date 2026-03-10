"use server"
import prisma from "@/lib/db"
import { generateVerificationToken } from "@/lib/utils"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer";

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}
// Register Checker with Email
export async function registerChecker(data: {
  firstName: string
  lastName: string
  email: string
  password: string
}): Promise<{ success?: boolean; error?: string }> {
  try {
    // Check if email exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      return { error: "Email already registered" }
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password)
    
    // Generate verification token
    const verificationToken = generateVerificationToken()

    // Create user with CHECKER role
    const user = await prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashedPassword,
        role: "CHECKER",
        status: "PENDING_VERIFICATION",
        verificationToken,
      },
    })

    // Create checker profile (pending)
    await prisma.checkerProfile.create({
      data: {
        userId: user.id,
        professionalTitle: "Checker",
        description: "",
        status: "PENDING",
      },
    })

    // Send verification email
    await sendVerificationEmail(data.email, verificationToken)

    return { success: true }
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "Failed to create account" }
  }
}
export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
  // Create SMTP transporter using OVH credentials from environment
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },});
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>You're almost in</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: Georgia, 'Times New Roman', serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f7; padding: 48px 0;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" border="0"
               style="background-color: #ffffff; border-radius: 10px; max-width: 580px;">

          <!-- Top accent line -->
          <tr>
            <td style="background-color: #2563eb; height: 4px; border-radius: 10px 10px 0 0; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 44px 48px 36px 48px;">

              <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 600; color: #2563eb; letter-spacing: 0.5px; text-transform: uppercase;">
                Checkerist
              </p>

              <h1 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 700; color: #111827; line-height: 1.3; font-family: Arial, sans-serif;">
                You're almost in — just one step left
              </h1>

              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.7; color: #374151; font-family: Arial, sans-serif;">
                Hi there,
              </p>

              <p style="margin: 0 0 28px 0; font-size: 15px; line-height: 1.7; color: #374151; font-family: Arial, sans-serif;">
                Someone used this email address to create a Checkerist account.
                If that was you, click the button below to activate it. The link is valid for the next 24 hours.
              </p>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 32px;">
                <tr>
                  <td align="center" style="background-color: #2563eb; border-radius: 6px;">
                    <a href="${verifyUrl}"
                       target="_blank"
                       style="display: inline-block; padding: 14px 32px; font-size: 15px;
                              font-weight: 600; color: #ffffff; text-decoration: none;
                              font-family: Arial, sans-serif;">
                      Activate my account
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #6b7280; font-family: Arial, sans-serif;">
                If you did not create this account, no action is needed — nothing will happen without this confirmation.
              </p>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 48px;">
              <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 48px 36px 48px;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af; line-height: 1.6; font-family: Arial, sans-serif;">
                This email was sent by Checkerist &middot; checkerist.com<br />
                You are receiving this because an account registration was initiated with your email address.
              </p>
            </td>
          </tr>

          <!-- Bottom accent line -->
          <tr>
            <td style="background-color: #f3f4f6; height: 4px; border-radius: 0 0 10px 10px; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: email,
      subject: "Complete your Checkerist registration",
      html,
    });
    // optional: log messageId / response
    console.log("Email sent:", info.messageId ?? info.response);
    return { ok: true, info };
  } catch (err) {
    console.error("Failed to send verification email:", err);
    return { ok: false, error: String(err) };
  }
}
export async function sendVerificationEmail2(email: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Confirm your email – Checkerist</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: Georgia, 'Times New Roman', serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f7; padding: 48px 0;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" border="0"
               style="background-color: #ffffff; border-radius: 10px; max-width: 580px;">

          <!-- Top accent line -->
          <tr>
            <td style="background-color: #2563eb; height: 4px; border-radius: 10px 10px 0 0; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 44px 48px 36px 48px;">

              <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 600; color: #2563eb; letter-spacing: 0.5px; text-transform: uppercase;">
                Checkerist
              </p>

              <h1 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 700; color: #111827; line-height: 1.3; font-family: Arial, sans-serif;">
                One click away from booking with confidence
              </h1>

              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.7; color: #374151; font-family: Arial, sans-serif;">
                Welcome,
              </p>

              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.7; color: #374151; font-family: Arial, sans-serif;">
                Thank you for joining Checkerist — the platform that puts the truth back into travel.
              </p>

              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.7; color: #374151; font-family: Arial, sans-serif;">
                We believe you deserve to know exactly what you are booking before you arrive. That is why we connect you with <strong>verified local experts</strong> who physically inspect hotels, rentals, and accommodations on your behalf — capturing real photos, honest observations, and ground-level details that no listing page can provide.
              </p>

              <p style="margin: 0 0 28px 0; font-size: 15px; line-height: 1.7; color: #374151; font-family: Arial, sans-serif;">
                To activate your account and start exploring, please confirm your email address. This link is valid for the next <strong>24 hours</strong>.
              </p>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 32px;">
                <tr>
                  <td align="center" style="background-color: #2563eb; border-radius: 6px;">
                    <a href="${verifyUrl}"
                       target="_blank"
                       style="display: inline-block; padding: 14px 32px; font-size: 15px;
                              font-weight: 600; color: #ffffff; text-decoration: none;
                              font-family: Arial, sans-serif;">
                      Confirm my email address
                    </a>
                  </td>
                </tr>
              </table>

           

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 48px;">
              <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 48px 36px 48px;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af; line-height: 1.6; font-family: Arial, sans-serif;">
                This message was sent by Checkerist &middot; checkerist.com<br />
                You are receiving this email because an account registration was initiated with your email address.<br />
                If you have questions, contact us at contact@checkerist.com
              </p>
            </td>
          </tr>

          <!-- Bottom accent line -->
          <tr>
            <td style="background-color: #f3f4f6; height: 4px; border-radius: 0 0 10px 10px; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

  try {
    const info = await transporter.sendMail({
      from: `"Checkerist" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: "Complete your Checkerist registration",
      html,
    });
    console.log("Email sent:", info.messageId ?? info.response);
    return { ok: true, info };
  } catch (err) {
    console.error("Failed to send verification email:", err);
    return { ok: false, error: String(err) };
  }
}