import { MetricsService } from '../services/metrics.service';
import { ResourceManager } from '../../resources/resource-manager';
import { ModuleRegistry } from '../../modules/module-registry';

describe('MetricsService', () => {
  let metricsService: MetricsService;
  let resourceManager: ResourceManager;
  let moduleRegistry: ModuleRegistry;

  beforeEach(() => {
    resourceManager = new ResourceManager();
    moduleRegistry = new ModuleRegistry();
    metricsService = new MetricsService(resourceManager, moduleRegistry);
  });

  test('should collect system metrics', async () => {
    const metrics = await metricsService.getSystemMetrics();
    
    expect(metrics).toHaveProperty('totalCpuUsage');
    expect(metrics).toHaveProperty('totalMemoryUsage');
    expect(metrics).toHaveProperty('activeModules');
    expect(metrics).toHaveProperty('totalModules');
    expect(metrics).toHaveProperty('uptime');
  });
});