import { PrismaClient } from '@prisma/client';
import { IModuleMetrics } from '../interfaces/module.interface';

export class MetricsRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async saveModuleMetrics(moduleId: string, metrics: IModuleMetrics) {
    return this.prisma.moduleMetrics.create({
      data: {
        moduleId,
        cpuUsage: metrics.cpuUsage,
        memoryUsage: metrics.memoryUsage,
        uptime: metrics.uptime,
        timestamp: new Date()
      }
    });
  }

  async getModuleMetrics(moduleId: string, timeRange: { start: Date; end: Date }) {
    return this.prisma.moduleMetrics.findMany({
      where: {
        moduleId,
        timestamp: {
          gte: timeRange.start,
          lte: timeRange.end
        }
      },
      orderBy: {
        timestamp: 'asc'
      }
    });
  }
}