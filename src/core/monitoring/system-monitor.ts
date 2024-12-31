import { EventEmitter } from 'events';
import { MetricsService } from '../services/metrics.service';
import { HealthService } from '../services/health.service';
import { ISystemMetrics } from '../interfaces/system.interface';
import { SystemError } from '../errors/system-error';

export class SystemMonitor extends EventEmitter {
  private metricsInterval: NodeJS.Timeout | null = null;
  private healthCheckInterval: NodeJS.Timeout | null = null;
  private readonly METRICS_INTERVAL = 5000; // 5 seconds
  private readonly HEALTH_CHECK_INTERVAL = 30000; // 30 seconds

  constructor(
    private metricsService: MetricsService,
    private healthService: HealthService
  ) {
    super();
  }

  start(): void {
    this.startMetricsCollection();
    this.startHealthChecks();
  }

  stop(): void {
    if (this.metricsInterval) {
      clearInterval(this.metricsInterval);
      this.metricsInterval = null;
    }
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
  }

  private startMetricsCollection(): void {
    this.metricsInterval = setInterval(async () => {
      try {
        const metrics = await this.metricsService.getSystemMetrics();
        this.emit('metrics', metrics);
        await this.checkThresholds(metrics);
      } catch (error) {
        this.handleError(error);
      }
    }, this.METRICS_INTERVAL);
  }

  private startHealthChecks(): void {
    this.healthCheckInterval = setInterval(async () => {
      try {
        const health = await this.healthService.checkSystemHealth();
        this.emit('health', health);
        
        if (health.status === 'ERROR') {
          this.emit('system-error', new SystemError(
            'System health check failed',
            'HEALTH_CHECK_ERROR',
            'HIGH',
            { components: health.components }
          ));
        }
      } catch (error) {
        this.handleError(error);
      }
    }, this.HEALTH_CHECK_INTERVAL);
  }

  private async checkThresholds(metrics: ISystemMetrics): Promise<void> {
    const CPU_THRESHOLD = 90;
    const MEMORY_THRESHOLD = 90;

    if (metrics.totalCpuUsage > CPU_THRESHOLD) {
      this.emit('threshold-exceeded', {
        type: 'CPU',
        value: metrics.totalCpuUsage,
        threshold: CPU_THRESHOLD
      });
    }

    if (metrics.totalMemoryUsage > MEMORY_THRESHOLD) {
      this.emit('threshold-exceeded', {
        type: 'MEMORY',
        value: metrics.totalMemoryUsage,
        threshold: MEMORY_THRESHOLD
      });
    }
  }

  private handleError(error: unknown): void {
    const systemError = error instanceof SystemError
      ? error
      : new SystemError(
          'System monitoring error',
          'MONITORING_ERROR',
          'MEDIUM',
          { originalError: error }
        );
    
    this.emit('error', systemError);
  }
}