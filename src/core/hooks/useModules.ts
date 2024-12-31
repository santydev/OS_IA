"use client"

import { useCallback } from "react"
import { moduleConfig } from "@/config/modules.config"

export const useModules = () => {
  const getEnabledModules = useCallback(() => {
    return Object.entries(moduleConfig)
      .filter(([_, enabled]) => enabled)
      .map(([id]) => id)
  }, [])

  const isModuleEnabled = useCallback(
    (moduleId: string) => {
      return moduleConfig[moduleId as keyof typeof moduleConfig] ?? false
    },
    []
  )

  return {
    getEnabledModules,
    isModuleEnabled,
  }
}