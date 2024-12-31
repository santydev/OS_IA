import { EventEmitter } from 'events';
import { MetricsService } from './metrics.service';
import { HealthService } from './health.service';

export class MonitoringService extends EventEmitter {
  private metricsInterval: NodeJS.Timeout | null = null;
  private healthInterval: NodeJS.Timeout | null = null;

  constructor(
    private metricsService: MetricsService,
    private healthService: HealthService
  ) {
    super();
  }

  startMonitoring() {
    this.metricsInterval = setInterval(async () => {
      try {
        const metrics = await this.metricsService.getSystemMetrics();
        this.emit('metrics', metrics);
      } catch (error) {
        this.emit('error', error);
      }
    }, 5000);

    this.healthInterval = setInterval(async () => {
      try {
        const health = await this.healthService.checkSystemHealth();
        this.emit('health', health);
      } catch (error) {
        this.emit('error', error);
      }
    }, 10000);
  }

  stopMonitoring() {
    if (this.metricsInterval) clearInterval(this.metricsInterval);
    if (this.healthInterval) clearInterval(this.healthInterval);
  }
}