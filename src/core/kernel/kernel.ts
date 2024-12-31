import { Module, KernelState } from './types';
import { ResourceManager } from '../resources/resource-manager';
import { SnapshotManager } from '../snapshots/snapshot-manager';
import { ModuleRegistry } from '../modules/module-registry';

export class Kernel {
  private state: KernelState;
  private resourceManager: ResourceManager;
  private snapshotManager: SnapshotManager;
  private moduleRegistry: ModuleRegistry;

  constructor() {
    this.state = {
      modules: [],
      resources: {
        totalCpu: 100,
        totalMemory: 1024,
        availableCpu: 100,
        availableMemory: 1024
      }
    };
    this.resourceManager = new ResourceManager();
    this.snapshotManager = new SnapshotManager();
    this.moduleRegistry = new ModuleRegistry();
  }

  async registerModule(module: Omit<Module, 'id'>): Promise<Module> {
    const registeredModule = await this.moduleRegistry.register(module);
    this.state.modules.push(registeredModule);
    return registeredModule;
  }

  async allocateResources(moduleId: string, resources: Module['resources']): Promise<boolean> {
    return this.resourceManager.allocate(moduleId, resources);
  }

  async createSnapshot(moduleId: string): Promise<void> {
    const module = this.state.modules.find(m => m.id === moduleId);
    if (!module) throw new Error('Module not found');
    await this.snapshotManager.create(module);
  }

  getState(): KernelState {
    return { ...this.state };
  }
}