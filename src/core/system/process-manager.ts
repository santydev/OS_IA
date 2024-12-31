import { EventEmitter } from 'events';
import { SystemError } from '../errors/system-error';

export class ProcessManager extends EventEmitter {
  private processes: Map<string, NodeJS.Process> = new Map();

  async startProcess(id: string, command: string, args: string[]): Promise<void> {
    try {
      const process = require('child_process').spawn(command, args);
      this.processes.set(id, process);
      this.emit('process:started', { id, pid: process.pid });
    } catch (error) {
      throw new SystemError(
        `Failed to start process ${id}`,
        'PROCESS_START_ERROR',
        'HIGH',
        { command, args }
      );
    }
  }

  async stopProcess(id: string): Promise<void> {
    const process = this.processes.get(id);
    if (process) {
      process.kill();
      this.processes.delete(id);
      this.emit('process:stopped', { id });
    }
  }
}