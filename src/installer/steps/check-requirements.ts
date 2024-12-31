import { SystemRequirements } from '../types';
import { SystemError } from '@/core/errors/system-error';
import os from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class SystemRequirementsChecker {
  constructor(private requirements: SystemRequirements) {}

  async checkCPU(): Promise<boolean> {
    const cpus = os.cpus();
    return cpus.length >= this.requirements.minCPU;
  }

  async checkRAM(): Promise<boolean> {
    const totalMem = os.totalmem();
    return totalMem >= this.requirements.minRAM * 1024 * 1024 * 1024;
  }

  async checkDiskSpace(): Promise<boolean> {
    try {
      const { stdout } = await execAsync('df -k / | tail -1 | awk \'{print $4}\'');
      const availableSpace = parseInt(stdout.trim()) * 1024;
      return availableSpace >= this.requirements.minDiskSpace;
    } catch (error) {
      throw new SystemError(
        'Failed to check disk space',
        'DISK_CHECK_ERROR',
        'HIGH',
        { error }
      );
    }
  }

  async checkPorts(): Promise<boolean> {
    for (const port of this.requirements.requiredPorts) {
      try {
        await execAsync(`nc -z localhost ${port}`);
        return false; // Port is in use
      } catch {
        continue; // Port is available
      }
    }
    return true;
  }

  async validateAll(): Promise<boolean> {
    const checks = await Promise.all([
      this.checkCPU(),
      this.checkRAM(),
      this.checkDiskSpace(),
      this.checkPorts()
    ]);
    return checks.every(check => check);
  }
}