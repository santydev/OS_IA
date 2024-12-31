"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Module } from "@/core/kernel/types";
import { IModuleMetrics } from "@/core/interfaces/module.interface";

interface ModuleDetailsProps {
  module: Module;
  metrics: IModuleMetrics;
  onCreateSnapshot: () => Promise<void>;
  onRestart: () => Promise<void>;
}

export function ModuleDetails({
  module,
  metrics,
  onCreateSnapshot,
  onRestart,
}: ModuleDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: () => Promise<void>) => {
    setIsLoading(true);
    try {
      await action();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Module Details</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="Name" value={module.name} />
          <InfoItem label="Type" value={module.type} />
          <InfoItem label="Status" value={module.status} />
          <InfoItem label="CPU Usage" value={`${metrics.cpuUsage.toFixed(1)}%`} />
          <InfoItem label="Memory Usage" value={`${metrics.memoryUsage.toFixed(1)}MB`} />
          <InfoItem label="Uptime" value={`${metrics.uptime}s`} />
        </div>
        
        <div className="flex space-x-4 mt-6">
          <Button
            onClick={() => handleAction(onCreateSnapshot)}
            disabled={isLoading}
          >
            Create Snapshot
          </Button>
          <Button
            onClick={() => handleAction(onRestart)}
            disabled={isLoading}
            variant="outline"
          >
            Restart Module
          </Button>
        </div>
      </div>
    </Card>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}