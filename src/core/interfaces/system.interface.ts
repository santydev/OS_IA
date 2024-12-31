export interface ISystemMetrics {
  totalCpuUsage: number;
  totalMemoryUsage: number;
  activeModules: number;
  totalModules: number;
  uptime: number;
}

export interface ISystemHealth {
  status: 'HEALTHY' | 'DEGRADED' | 'ERROR';
  lastCheck: Date;
  components: {
    name: string;
    status: 'HEALTHY' | 'DEGRADED' | 'ERROR';
    message?: string;
  }[];
}