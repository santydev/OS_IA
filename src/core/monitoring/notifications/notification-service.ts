import { SystemAlert } from '../types';

export interface NotificationChannel {
  send(alert: SystemAlert): Promise<void>;
}

export class NotificationService {
  private channels: Map<string, NotificationChannel> = new Map();

  registerChannel(name: string, channel: NotificationChannel) {
    this.channels.set(name, channel);
  }

  async notify(alert: SystemAlert) {
    const promises = Array.from(this.channels.values()).map(channel =>
      channel.send(alert).catch(error => {
        console.error(`Failed to send notification:`, error);
      })
    );

    await Promise.allSettled(promises);
  }
}