import { EventEmitter } from 'events';
import { createMonitoringSystem } from '../monitoring';
import { ResourceManager } from '../resources/resource-manager';
import { ModuleRegistry } from '../modules/module-registry';
import { MetricsRepository } from '../database/metrics.repository';
import { SystemAlert } from '../monitoring/types';

export class KernelMonitor extends EventEmitter {
  private monitoringSystem: ReturnType<typeof createMonitoringSystem>;

  constructor(
    resourceManager: ResourceManager,
    moduleRegistry: ModuleRegistry,
    metricsRepository: MetricsRepository
  ) {
    super();
    this.monitoringSystem = createMonitoringSystem(
      resourceManager,
      moduleRegistry,
      metricsRepository
    );

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.monitoringSystem.on('metrics', (data) => {
      this.emit('metrics', data);
    });

    this.monitoringSystem.on('alerts', (alerts: SystemAlert[]) => {
      alerts.forEach(alert => {
        this.emit('alert', alert);
        if (alert.type === 'ERROR') {
          this.handleCriticalAlert(alert);
        }
      });
    });

    this.monitoringSystem.on('error', (error) => {
      this.emit('error', error);
      console.error('Monitoring system error:', error);
    });
  }

  private handleCriticalAlert(alert: SystemAlert) {
    // Implement critical alert handling logic
    console.error('Critical system alert:', alert);
    // Could trigger automatic actions like resource reallocation
  }

  start(intervalMs?: number) {
    this.monitoringSystem.start(intervalMs);
  }

  stop() {
    this.monitoringSystem.stop();
  }
}