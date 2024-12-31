"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Activity, Cpu, Memory, Server } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { SystemMetrics } from "@/core/monitoring/types"

interface MetricsHistory {
  timestamp: number
  cpu: number
  memory: number
  activeModules: number
}

export function MonitoringDashboard() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null)
  const [history, setHistory] = useState<MetricsHistory[]>([])

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("/api/system/metrics")
        const data = await response.json()
        setMetrics(data)
        
        setHistory(prev => [...prev, {
          timestamp: Date.now(),
          cpu: data.totalCpuUsage,
          memory: data.totalMemoryUsage,
          activeModules: data.activeModules
        }].slice(-30)) // Keep last 30 data points
      } catch (error) {
        console.error("Failed to fetch metrics:", error)
      }
    }

    fetchMetrics()
    const interval = setInterval(fetchMetrics, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!metrics) {
    return <div>Loading metrics...</div>
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="CPU Usage"
          value={`${metrics.totalCpuUsage.toFixed(1)}%`}
          icon={<Cpu className="h-4 w-4" />}
          trend={getTrend(history, "cpu")}
        />
        <MetricCard
          title="Memory Usage"
          value={`${metrics.totalMemoryUsage.toFixed(1)} MB`}
          icon={<Memory className="h-4 w-4" />}
          trend={getTrend(history, "memory")}
        />
        <MetricCard
          title="Active Modules"
          value={metrics.activeModules.toString()}
          icon={<Server className="h-4 w-4" />}
          subtitle={`of ${metrics.totalModules} total`}
        />
        <MetricCard
          title="System Uptime"
          value={formatUptime(metrics.uptime)}
          icon={<Activity className="h-4 w-4" />}
        />
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">System Performance</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <XAxis 
                dataKey="timestamp"
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleString()}
              />
              <Line 
                type="monotone"
                dataKey="cpu"
                stroke="hsl(var(--chart-1))"
                name="CPU Usage (%)"
              />
              <Line
                type="monotone"
                dataKey="memory"
                stroke="hsl(var(--chart-2))"
                name="Memory Usage (MB)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  icon: React.ReactNode
  trend?: number
  subtitle?: string
}

function MetricCard({ title, value, icon, trend, subtitle }: MetricCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-semibold">{value}</p>
            {trend !== undefined && (
              <span className={`text-sm ${
                trend > 0 ? "text-green-500" : trend < 0 ? "text-red-500" : "text-gray-500"
              }`}>
                {trend > 0 ? "↑" : trend < 0 ? "↓" : "→"}
                {Math.abs(trend).toFixed(1)}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="p-2 bg-primary/10 rounded-full">
          {icon}
        </div>
      </div>
    </Card>
  )
}

function getTrend(history: MetricsHistory[], key: keyof Omit<MetricsHistory, "timestamp">): number {
  if (history.length < 2) return 0
  const current = history[history.length - 1][key] as number
  const previous = history[history.length - 2][key] as number
  return ((current - previous) / previous) * 100
}

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  
  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}