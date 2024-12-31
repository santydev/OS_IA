import { ResourceManager } from '../../resources/resource-manager';

export class ResourceCollector {
  constructor(private resourceManager: ResourceManager) {}

  collect() {
    const usage = this.resourceManager.getUsage();
    return {
      cpu: {
        usage: usage.cpu,
        timestamp: new Date()
      },
      memory: {
        usage: usage.memory,
        timestamp: new Date()
      }
    };
  }
}