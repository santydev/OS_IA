import { PrismaClient } from '@prisma/client';
import { Snapshot } from '../kernel/types';

export class SnapshotRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createSnapshot(snapshot: Omit<Snapshot, 'id'>) {
    return this.prisma.snapshot.create({
      data: {
        moduleId: snapshot.moduleId,
        state: snapshot.state,
        timestamp: snapshot.timestamp
      }
    });
  }

  async getLatestSnapshot(moduleId: string) {
    return this.prisma.snapshot.findFirst({
      where: { moduleId },
      orderBy: { timestamp: 'desc' }
    });
  }
}