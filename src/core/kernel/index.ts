import { Kernel } from './kernel';
import { KernelMonitor } from './kernel-monitor';
import { ResourceManager } from '../resources/resource-manager';
import { ModuleRegistry } from '../modules/module-registry';
import { MetricsRepository } from '../database/metrics.repository';

export function createKernel(
  resourceManager: ResourceManager,
  moduleRegistry: ModuleRegistry,
  metricsRepository: MetricsRepository
) {
  const kernel = new Kernel();
  const monitor = new KernelMonitor(
    resourceManager,
    moduleRegistry,
    metricsRepository
  );

  // Start monitoring with 5-second interval
  monitor.start(5000);

  return {
    kernel,
    monitor
  };
}

export * from './types';