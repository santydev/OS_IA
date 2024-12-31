import { SYSTEM_CONSTANTS } from '@/config/constants';

export interface IModuleConfig {
  name: string;
  type: typeof SYSTEM_CONSTANTS.MODULE_TYPES[keyof typeof SYSTEM_CONSTANTS.MODULE_TYPES];
  requiredCpu: number;
  requiredMemory: number;
  priority: number;
}

export interface IModuleMetrics {
  cpuUsage: number;
  memoryUsage: number;
  uptime: number;
  lastHeartbeat: Date;
}

export interface IModuleHealth {
  status: typeof SYSTEM_CONSTANTS.MODULE_STATUS[keyof typeof SYSTEM_CONSTANTS.MODULE_STATUS];
  lastCheck: Date;
  errors: string[];
}