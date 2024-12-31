import { ModuleRegistry } from '../../modules/module-registry';

export class ModuleCollector {
  constructor(private moduleRegistry: ModuleRegistry) {}

  async collect() {
    const modules = await this.moduleRegistry.listModules();
    return {
      total: modules.length,
      active: modules.filter(m => m.status === 'ACTIVE').length,
      inactive: modules.filter(m => m.status === 'INACTIVE').length,
      error: modules.filter(m => m.status === 'ERROR').length,
      timestamp: new Date()
    };
  }
}