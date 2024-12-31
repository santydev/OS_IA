import { ISystemHealth } from '../interfaces/system.interface';
import { ModuleRegistry } from '../modules/module-registry';

export class HealthService {
  constructor(private moduleRegistry: ModuleRegistry) {}

  async checkSystemHealth(): Promise<ISystemHealth> {
    const modules = await this.moduleRegistry.listModules();
    const componentStatuses = modules.map(module => ({
      name: module.name,
      status: module.status === 'ERROR' ? 'ERROR' : 'HEALTHY',
      message: module.status === 'ERROR' ? 'Module reported error state' : undefined
    }));

    const hasErrors = componentStatuses.some(c => c.status === 'ERROR');
    const hasDegraded = componentStatuses.some(c => c.status === 'DEGRADED');

    return {
      status: hasErrors ? 'ERROR' : hasDegraded ? 'DEGRADED' : 'HEALTHY',
      lastCheck: new Date(),
      components: componentStatuses
    };
  }
}