// app/verify-email/page.tsx
"use client"

import { useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const error = searchParams.get("error")
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    error ? "error" : token ? "loading" : "error"
  )
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (token && !error) {
      // Verify the token
      fetch(`/api/auth/verify-email?token=${token}`)
        .then(res => {
          if (res.redirected) {
            window.location.href = res.url
          }
        })
        .catch(() => {
          setStatus("error")
          setMessage("Verification failed. Please try again.")
        })
    } else if (error) {
      setStatus("error")
      setMessage(getErrorMessage(error))
    }
  }, [token, error])

  function getErrorMessage(err: string): string {
    switch (err) {
      case "missing_token":
        return "Verification link is invalid or expired."
      case "Invalid or expired verification token":
        return "This verification link has expired. Please register again."
      default:
        return "Verification failed. Please try again."
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying your email...</h2>
            <p className="text-gray-600">Please wait while we verify your account.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-6">Your account has been verified successfully.</p>
            <a
              href="/login"
              className="inline-block w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
            >
              Sign In
            </a>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <a
              href="/register"
              className="inline-block w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
            >
              Register Again
            </a>
          </>
        )}
      </div>
    </div>
  )
}