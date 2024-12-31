export interface ThresholdConfig {
  cpu: number;
  memory: number;
}

export class ThresholdAnalyzer {
  constructor(private config: ThresholdConfig) {}

  analyze(metrics: { cpu: number; memory: number }) {
    const alerts = [];
    
    if (metrics.cpu > this.config.cpu) {
      alerts.push({
        type: 'WARNING',
        message: `CPU usage exceeded threshold: ${metrics.cpu}%`,
        timestamp: new Date()
      });
    }

    if (metrics.memory > this.config.memory) {
      alerts.push({
        type: 'WARNING',
        message: `Memory usage exceeded threshold: ${metrics.memory}MB`,
        timestamp: new Date()
      });
    }

    return alerts;
  }
}