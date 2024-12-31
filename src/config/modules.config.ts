import { z } from "zod"

export const ModuleConfig = z.object({
  emailAutomation: z.boolean(),
  analytics: z.boolean(),
  taskManager: z.boolean(),
  agenda: z.boolean()
})

export type ModuleConfigType = z.infer<typeof ModuleConfig>

export const moduleConfig: ModuleConfigType = {
  emailAutomation: true,
  analytics: true,
  taskManager: true,
  agenda: true
}