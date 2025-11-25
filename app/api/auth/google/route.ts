import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {
  const role = req.nextUrl.searchParams.get("role") || "USER"
  
  // Store role in state for callback
  const state = Buffer.from(JSON.stringify({ role })).toString("base64")
  const nextpublicurl = "https://localhost:3000"//process.env.NEXT_PUBLIC_APP_URL 
  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID!,
    redirect_uri: `${nextpublicurl}/api/auth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    state,
    access_type: "offline",
    prompt: "consent",
  })

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params}`
  )
}
