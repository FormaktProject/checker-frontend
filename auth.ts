"use server"
import bcrypt from "bcryptjs"
// lib/auth.ts
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import prisma from "./lib/db"
const secretKey = new TextEncoder().encode(process.env.AUTH_SECRET!)

interface SessionUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "USER" | "CHECKER" | "ADMIN" | "SUPER_ADMIN"
}

// Encrypt payload into JWT
export async function encrypt(payload: any): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secretKey)
}

// Decrypt JWT
export async function decrypt(token: string): Promise<any> {
  const { payload } = await jwtVerify(token, secretKey, { algorithms: ["HS256"] })
  return payload
}
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
// Verify email with token
export async function verifyEmail(token: string): Promise<{ success?: boolean; error?: string }> {
  try {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    })

    if (!user) {
      return { error: "Invalid or expired verification token" }
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        status: "ACTIVE",
        verificationToken: null,
      },
    })
    // here i need to send email of welcoming to the user
    
    return { success: true }
  } catch (error) {
    return { error: "Verification failed" }
  }
}
// Login with Email and Password
export async function login(data: {
  email: string
  password: string
}): Promise<{ success?: boolean; role?: string; error?: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (!user || !user.password) {
      return { error: "Invalid email or password" }
    }

    if (user.status === "PENDING_VERIFICATION") {
      return { error: "Please verify your email first" }
    }

    const isValid = await verifyPassword(data.password, user.password)
    if (!isValid) {
      return { error: "Invalid email or password" }
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    })

    // Create session
    const sessionUser: SessionUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    }

    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    const session = await encrypt({ user: sessionUser, expires: expires.toISOString() })

    ;(await cookies()).set("checker-session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    return { success: true, role: user.role }
  } catch (error) {
    return { error: "Login failed" }
  }
}

// Logout
export async function logout(): Promise<void> {
  ;(await cookies()).set("checker-session", "", { expires: new Date(0) })
}

// Get current session
export async function getSession(): Promise<{ user: SessionUser } | null> {
  const session = (await cookies()).get("checker-session")?.value
  if (!session) return null
  
  try {
    return await decrypt(session)
  } catch {
    return null
  }
}


