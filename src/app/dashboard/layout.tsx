"use client"

import { useModules } from "@/core/hooks/useModules"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from "next/dynamic"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { getEnabledModules } = useModules()
  const enabledModules = getEnabledModules()

  const moduleComponents = {
    emailAutomation: dynamic(() => import("@/modules/email-automation/components/CampaignList")),
    analytics: dynamic(() => import("@/modules/analytics/components/AnalyticsDashboard")),
    taskManager: dynamic(() => import("@/modules/task-manager/components/TaskBoard")),
    agenda: dynamic(() => import("@/modules/agenda"))
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {enabledModules.map((moduleId) => (
            <TabsTrigger key={moduleId} value={moduleId}>
              {moduleId.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          {children}
        </TabsContent>

        {enabledModules.map((moduleId) => {
          const ModuleComponent = moduleComponents[moduleId as keyof typeof moduleComponents]
          return (
            <TabsContent key={moduleId} value={moduleId}>
              {ModuleComponent && <ModuleComponent />}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}