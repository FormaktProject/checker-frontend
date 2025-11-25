import { NextRequest, NextResponse } from "next/server"
import { verifyEmail } from "@/auth"

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token")
  
  if (!token) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?error=missing_token`
    )
  }

  const result = await verifyEmail(token)
  
  if (result.error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?error=${result.error}`
    )
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_APP_URL}/sign-in?verified=true`
  )
}