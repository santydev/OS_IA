"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  const { data: session } = useSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">Welcome to Jarvis</h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left gap-8">
        <Link href="/auth/signin">
          <Button size="lg">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}