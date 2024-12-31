import { NotificationChannel } from '../notification-service';
import { SystemAlert } from '../../types';

export class EmailChannel implements NotificationChannel {
  constructor(private emailConfig: {
    to: string[];
    from: string;
  }) {}

  async send(alert: SystemAlert): Promise<void> {
    // Implement email sending logic here
    console.log('Sending email notification:', {
      to: this.emailConfig.to,
      from: this.emailConfig.from,
      subject: `System Alert: ${alert.type}`,
      text: alert.message
    });
  }
}