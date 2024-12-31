import { EventEmitter } from 'events';
import { SystemError } from '../errors/system-error';

export interface Alert {
  id: string;
  type: 'ERROR' | 'WARNING' | 'INFO';
  message: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export class AlertManager extends EventEmitter {
  private alerts: Alert[] = [];
  private readonly MAX_ALERTS = 100;

  constructor() {
    super();
  }

  addAlert(
    type: Alert['type'],
    message: string,
    metadata?: Record<string, unknown>
  ): Alert {
    const alert: Alert = {
      id: this.generateAlertId(),
      type,
      message,
      timestamp: new Date(),
      metadata
    };

    this.alerts.push(alert);
    if (this.alerts.length > this.MAX_ALERTS) {
      this.alerts.shift();
    }

    this.emit('new-alert', alert);
    return alert;
  }

  getRecentAlerts(limit = 10): Alert[] {
    return this.alerts.slice(-limit);
  }

  handleSystemError(error: SystemError): void {
    this.addAlert('ERROR', error.message, {
      code: error.code,
      severity: error.severity,
      ...error.metadata
    });
  }

  private generateAlertId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}