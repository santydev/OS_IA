import { MetricsRepository } from '../database/metrics.repository';
import { IModuleMetrics, ISystemMetrics } from '../interfaces/module.interface';
import { ModuleRegistry } from '../modules/module-registry';
import { ResourceManager } from '../resources/resource-manager';

export class MetricsService {
  constructor(
    private metricsRepository: MetricsRepository,
    private moduleRegistry: ModuleRegistry,
    private resourceManager: ResourceManager
  ) {}

  async collectModuleMetrics(moduleId: string): Promise<IModuleMetrics> {
    const module = await this.moduleRegistry.getModule(moduleId);
    if (!module) throw new Error('Module not found');

    const metrics: IModuleMetrics = {
      cpuUsage: 0,
      memoryUsage: 0,
      uptime: 0,
      lastHeartbeat: new Date()
    };

    await this.metricsRepository.saveModuleMetrics(moduleId, metrics);
    return metrics;
  }

  async getSystemMetrics(): Promise<ISystemMetrics> {
    const modules = await this.moduleRegistry.listModules();
    const resources = this.resourceManager.getUsage();

    return {
      totalCpuUsage: resources.cpu,
      totalMemoryUsage: resources.memory,
      activeModules: modules.filter(m => m.status === 'ACTIVE').length,
      totalModules: modules.length,
      uptime: process.uptime()
    };
  }
}