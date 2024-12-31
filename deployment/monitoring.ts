import { MetricsService } from '@/core/services/metrics.service';

export const monitoringConfig = {
  metrics: {
    interval: 60000, // 1 minute
    retention: '30d',
    alerts: {
      cpu: 80,
      memory: 85,
      disk: 90
    }
  },
  
  backup: {
    schedule: '0 3 * * *', // Tous les jours à 3h
    retention: 7,
    type: 'full'
  }
};