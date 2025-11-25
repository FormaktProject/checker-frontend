import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import prisma from "@/lib/db"
import { encrypt } from "@/auth"

interface SessionUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "USER" | "CHECKER" | "ADMIN" | "SUPER_ADMIN"
}
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code")
  const state = req.nextUrl.searchParams.get("state")
  const error = req.nextUrl.searchParams.get("error")
  // Handle OAuth errors (user cancelled, etc.)
  if (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/sign-in?error=oauth_cancelled`
    )
  }
  
  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/become-checker?error=no_code`)
  }

  // Parse state to get role
  let role = "USER"
  if (state) {
    try {
      const parsed = JSON.parse(Buffer.from(state, "base64").toString())
      role = parsed.role || "USER"
    } catch(e) {
        console.error("failed to parse state", e)
    }
  }

  try {
    // Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    })

    const tokens = await tokenRes.json()
    
    if (!tokens.access_token) {
      throw new Error("No access token")
    }

    // Get user info
    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    })
    
    const googleUser = await userRes.json()

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: googleUser.email },
    })

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          firstName: googleUser.given_name || googleUser.name?.split(" ")[0] || "",
          lastName: googleUser.family_name || googleUser.name?.split(" ").slice(1).join(" ") || "",
          avatar: googleUser.picture,
          role: role as any,
          status: "ACTIVE",
          emailVerified: new Date(),
          accounts: {
            create: {
              type: "oauth",
              provider: "google",
              providerAccountId: googleUser.id,
              access_token: tokens.access_token,
              refresh_token: tokens.refresh_token,
              expires_at: tokens.expires_in ? Math.floor(Date.now() / 1000) + tokens.expires_in : null,
              token_type: tokens.token_type,
              scope: tokens.scope,
              id_token: tokens.id_token,
            },
          },
        },
      })

      // If registering as CHECKER, create checker profile
      if (role === "CHECKER") {
        await prisma.checkerProfile.create({
          data: {
            userId: user.id,
            professionalTitle: "Checker",
            description: "",
            status: "PENDING",
          },
        })
      }
    } else {
        // Check if email needs verification (shouldn't happen with Google OAuth)
      if (user.status === "PENDING_VERIFICATION") {
        await prisma.user.update({
          where: { id: user.id },
          data: { 
            status: "ACTIVE",
            emailVerified: new Date()
          },
        })
      }
      // Update existing account tokens
      await prisma.account.upsert({
        where: {
          provider_providerAccountId: {
            provider: "google",
            providerAccountId: googleUser.id,
          },
        },
        update: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token || undefined,
          expires_at: tokens.expires_in ? Math.floor(Date.now() / 1000) + tokens.expires_in : null,
        },
        create: {
          userId: user.id,
          type: "oauth",
          provider: "google",
          providerAccountId: googleUser.id,
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_at: tokens.expires_in ? Math.floor(Date.now() / 1000) + tokens.expires_in : null,
        },
      })

      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      })
    }

    // Create session
    const sessionUser: SessionUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    }

    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ user: sessionUser, expires: expires.toISOString() })

    ;(await cookies()).set("checker-session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    // Redirect based on role
    let redirectUrl = "/"
    
    switch (user.role) {
      case "CHECKER":
        redirectUrl = "/checker"
        break
      case "ADMIN":
      case "SUPER_ADMIN":
        redirectUrl = "/admin"
        break
      case "USER":
      default:
        redirectUrl = "/user"
        break
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}${redirectUrl}`)
  } catch (error) {
    console.error("Google auth error:", error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/sign-in?error=auth_failed`
    )
  }
}