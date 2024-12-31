"use client"

import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="p-6 w-full max-w-[400px]">
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="text-red-500 mb-4">
          {error === "Configuration" 
            ? "There is a problem with the server configuration."
            : "An error occurred during authentication. Please try again."}
        </p>
        <Link href="/auth/signin">
          <Button className="w-full">Back to Sign In</Button>
        </Link>
      </Card>
    </div>
  )
}