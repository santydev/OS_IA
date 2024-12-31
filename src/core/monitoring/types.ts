export interface MetricsData {
  cpu: {
    usage: number;
    timestamp: Date;
  };
  memory: {
    usage: number;
    timestamp: Date;
  };
}

export interface ModuleStats {
  total: number;
  active: number;
  inactive: number;
  error: number;
  timestamp: Date;
}

export interface SystemAlert {
  type: 'ERROR' | 'WARNING' | 'INFO';
  message: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface HealthStatus {
  status: 'HEALTHY' | 'DEGRADED' | 'ERROR';
  errorCount: number;
  totalModules: number;
  timestamp: Date;
}