import { MetricsRepository } from '../../database/metrics.repository';

export class MetricsReporter {
  constructor(private repository: MetricsRepository) {}

  async report(metrics: any) {
    await this.repository.saveModuleMetrics(
      metrics.moduleId,
      {
        cpuUsage: metrics.cpu,
        memoryUsage: metrics.memory,
        uptime: metrics.uptime,
        lastHeartbeat: new Date()
      }
    );
  }

  async getHistoricalMetrics(moduleId: string, timeRange: { start: Date; end: Date }) {
    return this.repository.getModuleMetrics(moduleId, timeRange);
  }
}