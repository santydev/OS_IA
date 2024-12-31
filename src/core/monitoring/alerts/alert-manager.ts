import { EventEmitter } from 'events';
import { SystemAlert } from '../types';

export class AlertManager extends EventEmitter {
  private alerts: SystemAlert[] = [];
  private readonly MAX_ALERTS = 100;
  private thresholds: Record<string, number> = {
    cpu: 80,
    memory: 80,
    errorRate: 5
  };

  constructor() {
    super();
  }

  setThreshold(metric: string, value: number) {
    this.thresholds[metric] = value;
    this.emit('threshold-updated', { metric, value });
  }

  addAlert(alert: SystemAlert) {
    this.alerts.push(alert);
    if (this.alerts.length > this.MAX_ALERTS) {
      this.alerts.shift();
    }
    this.emit('new-alert', alert);
  }

  getRecentAlerts(limit = 10): SystemAlert[] {
    return this.alerts.slice(-limit);
  }

  checkThresholds(metrics: Record<string, number>) {
    Object.entries(metrics).forEach(([metric, value]) => {
      const threshold = this.thresholds[metric];
      if (threshold && value > threshold) {
        this.addAlert({
          type: 'WARNING',
          message: `${metric} exceeded threshold: ${value}`,
          timestamp: new Date(),
          metadata: { metric, value, threshold }
        });
      }
    });
  }
}