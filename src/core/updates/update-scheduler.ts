import { UpdateManager } from './update-manager';

export class UpdateScheduler {
  constructor(private updateManager: UpdateManager) {}

  schedulePeriodicCheck(intervalMs: number = 24 * 60 * 60 * 1000) {
    setInterval(async () => {
      try {
        const update = await this.updateManager.checkForUpdates();
        if (update) {
          await this.updateManager.performUpdate(update);
        }
      } catch (error) {
        console.error('Scheduled update check failed:', error);
      }
    }, intervalMs);
  }
}