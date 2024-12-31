import { SystemError } from '../errors/system-error';
import { EventEmitter } from 'events';

export class ErrorHandlerService extends EventEmitter {
  private errors: SystemError[] = [];

  handleError(error: SystemError | Error) {
    const systemError = error instanceof SystemError
      ? error
      : new SystemError(error.message, 'UNKNOWN_ERROR', 'MEDIUM');

    this.errors.push(systemError);
    this.emit('error', systemError);

    if (systemError.severity === 'HIGH') {
      this.emit('critical-error', systemError);
    }

    return systemError;
  }

  getRecentErrors(limit = 10) {
    return this.errors.slice(-limit);
  }

  clearErrors() {
    this.errors = [];
  }
}