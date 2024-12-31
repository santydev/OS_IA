"use client";

import { Card } from "@/components/ui/card";
import { ISystemMetrics } from "@/core/interfaces/system.interface";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface SystemMetricsProps {
  metrics: ISystemMetrics;
  history: Array<{ timestamp: string } & ISystemMetrics>;
}

export function SystemMetrics({ metrics, history }: SystemMetricsProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">System Metrics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="CPU Usage"
          value={`${metrics.totalCpuUsage.toFixed(1)}%`}
        />
        <MetricCard
          label="Memory Usage"
          value={`${metrics.totalMemoryUsage.toFixed(1)}MB`}
        />
        <MetricCard
          label="Active Modules"
          value={metrics.activeModules.toString()}
        />
        <MetricCard
          label="Uptime"
          value={formatUptime(metrics.uptime)}
        />
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="totalCpuUsage" 
              stroke="#8884d8" 
              name="CPU Usage"
            />
            <Line 
              type="monotone" 
              dataKey="totalMemoryUsage" 
              stroke="#82ca9d" 
              name="Memory Usage"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}