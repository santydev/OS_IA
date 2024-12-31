import { Module, Snapshot } from '../kernel/types';
import { SnapshotRepository } from '../database/snapshot.repository';
import { SystemError } from '../errors/system-error';

export class SnapshotManager {
  constructor(private repository: SnapshotRepository) {}

  async create(module: Module): Promise<Snapshot> {
    try {
      const state = await this.captureModuleState(module);
      const snapshot: Omit<Snapshot, 'id'> = {
        moduleId: module.id,
        state,
        timestamp: new Date()
      };
      
      return await this.repository.createSnapshot(snapshot);
    } catch (error) {
      throw new SystemError(
        `Failed to create snapshot for module ${module.id}`,
        'SNAPSHOT_CREATE_ERROR',
        'HIGH',
        { moduleId: module.id }
      );
    }
  }

  async restore(moduleId: string): Promise<void> {
    const snapshot = await this.repository.getLatestSnapshot(moduleId);
    if (!snapshot) {
      throw new SystemError(
        `No snapshot found for module ${moduleId}`,
        'SNAPSHOT_NOT_FOUND',
        'MEDIUM',
        { moduleId }
      );
    }

    await this.applySnapshot(moduleId, snapshot);
  }

  private async captureModuleState(module: Module): Promise<Record<string, unknown>> {
    return {
      resources: module.resources,
      status: module.status,
      timestamp: new Date().toISOString()
    };
  }

  private async applySnapshot(moduleId: string, snapshot: Snapshot): Promise<void> {
    // Implementation de la restauration du snapshot
    console.log(`Restoring snapshot ${snapshot.id} for module ${moduleId}`);
  }
}