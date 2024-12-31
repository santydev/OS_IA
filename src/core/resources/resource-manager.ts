import { Module } from '../kernel/types';

export class ResourceManager {
  private allocations: Map<string, Module['resources']> = new Map();

  async allocate(moduleId: string, resources: Module['resources']): Promise<boolean> {
    // Validate resource availability
    const currentAllocation = this.allocations.get(moduleId) || { cpu: 0, memory: 0 };
    const totalCpuUsed = Array.from(this.allocations.values())
      .reduce((sum, res) => sum + res.cpu, 0) - currentAllocation.cpu;
    const totalMemoryUsed = Array.from(this.allocations.values())
      .reduce((sum, res) => sum + res.memory, 0) - currentAllocation.memory;

    if (totalCpuUsed + resources.cpu > 100 || totalMemoryUsed + resources.memory > 1024) {
      return false;
    }

    this.allocations.set(moduleId, resources);
    return true;
  }

  async deallocate(moduleId: string): Promise<void> {
    this.allocations.delete(moduleId);
  }

  getUsage(): { cpu: number; memory: number } {
    const usage = Array.from(this.allocations.values()).reduce(
      (total, res) => ({
        cpu: total.cpu + res.cpu,
        memory: total.memory + res.memory
      }),
      { cpu: 0, memory: 0 }
    );
    return usage;
  }
}