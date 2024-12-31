import { NotificationChannel } from '../notification-service';
import { SystemAlert } from '../../types';

export class WebhookChannel implements NotificationChannel {
  constructor(private webhookUrl: string) {}

  async send(alert: SystemAlert): Promise<void> {
    try {
      await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alert)
      });
    } catch (error) {
      console.error('Failed to send webhook notification:', error);
      throw error;
    }
  }
}