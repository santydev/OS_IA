import { ResourceCollector } from './collectors/resource-collector';
import { ModuleCollector } from './collectors/module-collector';
import { ThresholdAnalyzer } from './analyzers/threshold-analyzer';
import { HealthAnalyzer } from './analyzers/health-analyzer';
import { MetricsReporter } from './reporters/metrics-reporter';
import { EventEmitter } from 'events';
import { AlertManager } from './alerts/alert-manager';
import { NotificationService } from './notifications/notification-service';

export class MonitorManager extends EventEmitter {
  private collectors: {
    resource: ResourceCollector;
    module: ModuleCollector;
  };
  
  private analyzers: {
    threshold: ThresholdAnalyzer;
    health: HealthAnalyzer;
  };

  private reporter: MetricsReporter;
  private alertManager: AlertManager;
  private notificationService: NotificationService;
  private interval: NodeJS.Timeout | null = null;

  constructor(
    collectors: MonitorManager['collectors'],
    analyzers: MonitorManager['analyzers'],
    reporter: MetricsReporter,
    alertManager: AlertManager,
    notificationService: NotificationService
  ) {
    super();
    this.collectors = collectors;
    this.analyzers = analyzers;
    this.reporter = reporter;
    this.alertManager = alertManager;
    this.notificationService = notificationService;
  }

  start(intervalMs: number = 5000) {
    if (this.interval) return;

    this.interval = setInterval(async () => {
      try {
        await this.collect();
      } catch (error) {
        this.handleError(error);
      }
    }, intervalMs);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private async collect() {
    const resources = this.collectors.resource.collect();
    const moduleStats = await this.collectors.module.collect();

    // Analyze metrics and generate alerts
    const alerts = this.analyzers.threshold.analyze({
      cpu: resources.cpu.usage,
      memory: resources.memory.usage
    });

    // Process alerts
    for (const alert of alerts) {
      this.alertManager.addAlert(alert);
      await this.notificationService.notify(alert);
    }

    // Report metrics
    await this.reporter.report({
      ...resources,
      ...moduleStats
    });

    // Emit metrics update
    this.emit('metrics', {
      resources,
      moduleStats,
      timestamp: new Date()
    });
  }

  private handleError(error: unknown) {
    const systemError = {
      type: 'ERROR' as const,
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date(),
      metadata: { error }
    };

    this.alertManager.addAlert(systemError);
    this.emit('error', systemError);
  }
}