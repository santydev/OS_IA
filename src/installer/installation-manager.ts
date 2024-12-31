import { EventEmitter } from 'events';
import { InstallationStep, InstallationConfig } from './types';
import { SystemError } from '@/core/errors/system-error';

export class InstallationManager extends EventEmitter {
  private currentStep: number = 0;
  private steps: InstallationStep[] = [];
  private snapshots: Map<string, any> = new Map();

  constructor(private config: InstallationConfig) {
    super();
    this.steps = config.steps;
  }

  async start(): Promise<void> {
    try {
      for (const step of this.steps) {
        this.emit('step:start', step);
        
        const isValid = await step.validate();
        if (!isValid) {
          throw new SystemError(
            `Validation failed for step ${step.id}`,
            'INSTALL_VALIDATION_ERROR',
            'HIGH'
          );
        }

        await this.createSnapshot(step.id);
        await step.execute();
        
        this.currentStep++;
        this.emit('step:complete', step);
      }
      
      this.emit('installation:complete');
    } catch (error) {
      await this.rollback();
      throw error;
    }
  }

  private async createSnapshot(stepId: string): Promise<void> {
    // Capture l'état du système avant l'exécution de l'étape
    this.snapshots.set(stepId, {
      timestamp: new Date(),
      // Ajouter d'autres données d'état si nécessaire
    });
  }

  private async rollback(): Promise<void> {
    for (let i = this.currentStep; i >= 0; i--) {
      const step = this.steps[i];
      try {
        await step.rollback();
      } catch (error) {
        console.error(`Rollback failed for step ${step.id}:`, error);
      }
    }
  }
}