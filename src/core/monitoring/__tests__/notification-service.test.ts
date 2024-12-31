import { NotificationService } from '../notifications/notification-service';
import { WebhookChannel } from '../notifications/channels/webhook-channel';
import { EmailChannel } from '../notifications/channels/email-channel';

describe('NotificationService', () => {
  let notificationService: NotificationService;

  beforeEach(() => {
    notificationService = new NotificationService();
  });

  test('should send notifications to all channels', async () => {
    const mockWebhook = jest.fn().mockResolvedValue(undefined);
    const mockEmail = jest.fn().mockResolvedValue(undefined);

    const webhookChannel = { send: mockWebhook };
    const emailChannel = { send: mockEmail };

    notificationService.registerChannel('webhook', webhookChannel);
    notificationService.registerChannel('email', emailChannel);

    const alert = {
      type: 'WARNING',
      message: 'Test alert',
      timestamp: new Date()
    };

    await notificationService.notify(alert);

    expect(mockWebhook).toHaveBeenCalledWith(alert);
    expect(mockEmail).toHaveBeenCalledWith(alert);
  });

  test('should continue if one channel fails', async () => {
    const mockSuccess = jest.fn().mockResolvedValue(undefined);
    const mockFailure = jest.fn().mockRejectedValue(new Error('Failed'));

    notificationService.registerChannel('success', { send: mockSuccess });
    notificationService.registerChannel('failure', { send: mockFailure });

    const alert = {
      type: 'WARNING',
      message: 'Test alert',
      timestamp: new Date()
    };

    await expect(notificationService.notify(alert)).resolves.not.toThrow();
    expect(mockSuccess).toHaveBeenCalled();
  });
});