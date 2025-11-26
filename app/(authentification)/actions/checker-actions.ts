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
    <div style="font-family: Arial, sans-serif; max-width:600px;margin:0 auto;">
      <h2 style="color:#111">Welcome to Checkerist</h2>
      <p>Verify your email by clicking the button below:</p>
      <a href="${verifyUrl}"
         style="display:inline-block;background:#2563eb;color:#fff;padding:12px
        20px;text-decoration:none;border-radius:8px;">
        Verify Email
      </a>
      <p style="font-size:13px;color:#666">Or paste this link in your browser:</p>
      <p style="font-size:13px;color:#666;word-break:break-all">${verifyUrl}</p>
      <p style="font-size:12px;color:#999">This link expires in 24 hours.</p>
    </div>
  `;
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: email,
      subject: "Verify your Checkerist account",
      html,});
    // optional: log messageId / response
    console.log("Email sent:", info.messageId ?? info.response);
    return { ok: true, info };
  } catch (err) {
    console.error("Failed to send verification email:", err);
    return { ok: false, error: String(err) };
  }
}