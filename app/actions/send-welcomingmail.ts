"use server"

import { User } from "../generated/prisma"
import nodemailer from "nodemailer"
import { generateWelcomeCheckerHTML } from "./generatewelcomingemail"
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // SSL on port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})
function getCheckerFullName(user: User): string {
  if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`
  return "Checker"
}
export async function sendWelcomeCheckerEmail(user: User): Promise<void> {
  if (user.role !== "CHECKER") return
  
  const fullName = getCheckerFullName(user)
  const html = generateWelcomeCheckerHTML(fullName)

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: `Welcome to Checkerist, ${fullName}! Your account is now active 🎉`,
    html,
  })
}