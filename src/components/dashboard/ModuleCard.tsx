"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Module } from "@/core/kernel/types";

interface ModuleCardProps {
  module: Module;
  onSelect: (moduleId: string) => void;
}

export function ModuleCard({ module, onSelect }: ModuleCardProps) {
  const statusColor = {
    ACTIVE: "bg-green-100 text-green-800",
    INACTIVE: "bg-gray-100 text-gray-800",
    ERROR: "bg-red-100 text-red-800",
  };

  return (
    <Card
      className="p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onSelect(module.id)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{module.name}</h3>
        <Badge className={statusColor[module.status]}>{module.status}</Badge>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <p>Type: {module.type}</p>
        <div className="flex justify-between">
          <span>CPU: {module.resources.cpu}%</span>
          <span>Memory: {module.resources.memory}MB</span>
        </div>
      </div>
    </Card>
  );
}