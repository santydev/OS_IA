import { MonitorManager } from './monitor-manager';
import { ResourceCollector } from './collectors/resource-collector';
import { ModuleCollector } from './collectors/module-collector';
import { ThresholdAnalyzer } from './analyzers/threshold-analyzer';
import { HealthAnalyzer } from './analyzers/health-analyzer';
import { MetricsReporter } from './reporters/metrics-reporter';
import { AlertManager } from './alerts/alert-manager';
import { NotificationService } from './notifications/notification-service';
import { WebhookChannel } from './notifications/channels/webhook-channel';
import { EmailChannel } from './notifications/channels/email-channel';
import { ResourceManager } from '../resources/resource-manager';
import { ModuleRegistry } from '../modules/module-registry';
import { MetricsRepository } from '../database/metrics.repository';

export function createMonitoringSystem(
  resourceManager: ResourceManager,
  moduleRegistry: ModuleRegistry,
  metricsRepository: MetricsRepository,
  config: {
    webhookUrl?: string;
    email?: { to: string[]; from: string; };
  } = {}
) {
  const collectors = {
    resource: new ResourceCollector(resourceManager),
    module: new ModuleCollector(moduleRegistry)
  };

  const analyzers = {
    threshold: new ThresholdAnalyzer({
      cpu: 80,
      memory: 80
    }),
    health: new HealthAnalyzer()
  };

  const reporter = new MetricsReporter(metricsRepository);
  const alertManager = new AlertManager();
  const notificationService = new NotificationService();

  // Configure notification channels
  if (config.webhookUrl) {
    notificationService.registerChannel('webhook', new WebhookChannel(config.webhookUrl));
  }
  
  if (config.email) {
    notificationService.registerChannel('email', new EmailChannel(config.email));
  }

  return new MonitorManager(
    collectors,
    analyzers,
    reporter,
    alertManager,
    notificationService
  );
}

export * from './types';