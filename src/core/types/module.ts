export interface Module {
  id: string
  name: string
  description: string
  icon: string
  enabled: boolean
  route: string
}

export interface ModuleLoader {
  load: () => Promise<{ default: React.ComponentType }>
}