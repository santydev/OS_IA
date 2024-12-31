"use client"

import { Card } from "@/components/ui/card"
import { useAnalytics } from "../hooks/useAnalytics"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export function AnalyticsDashboard() {
  const { data, isLoading } = useAnalytics()

  if (isLoading) {
    return <div>Loading analytics...</div>
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">User Activity</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}