import { registerChecker } from "@/app/(authentification)/actions/checker-actions"
import { NextRequest, NextResponse } from "next/server"
import z from "zod"
const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate input
    const result = registerSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: " Error of the form filed" },
        { status: 400 }
      )
    }

    const { firstName, lastName, email, password } = result.data
    
    const response = await registerChecker({ firstName, lastName, email, password })
    
    if (response.error) {
      return NextResponse.json({ error: response.error }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
