"use client"

import { useSession } from "next-auth/react"
import { Card } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { MonitoringDashboard } from "@/components/dashboard/MonitoringDashboard"

export default function DashboardPage() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <h3 className="font-semibold">Welcome back, {session.user.name}</h3>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            You have upcoming events scheduled for today.
          </p>
        </Card>
      </div>

      <MonitoringDashboard />
    </div>
  )
}