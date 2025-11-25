// app/api/auth/sign-in/route.ts
import { NextRequest, NextResponse } from "next/server"
import { login } from "@/auth"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password, rememberMe } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Attempt login
    const result = await login({ email, password })

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      )
    }

    // Return success with user role for frontend routing
    return NextResponse.json({
      success: true,
      role: result.role,
      message: "Login successful"
    })

  } catch (error) {
    console.error("Sign-in error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}