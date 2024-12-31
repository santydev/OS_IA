import { AlertManager } from '../alerts/alert-manager';

describe('AlertManager', () => {
  let alertManager: AlertManager;

  beforeEach(() => {
    alertManager = new AlertManager();
  });

  test('should set threshold correctly', () => {
    alertManager.setThreshold('cpu', 90);
    expect(alertManager.getThresholds().cpu).toBe(90);
  });

  test('should generate alert when threshold exceeded', () => {
    const mockAlert = jest.fn();
    alertManager.on('new-alert', mockAlert);

    alertManager.setThreshold('cpu', 80);
    alertManager.checkThresholds({ cpu: 85 });

    expect(mockAlert).toHaveBeenCalled();
  });

  test('should maintain max alerts limit', () => {
    for (let i = 0; i < 150; i++) {
      alertManager.addAlert({
        type: 'INFO',
        message: `Test alert ${i}`,
        timestamp: new Date()
      });
    }

    expect(alertManager.getRecentAlerts(200).length).toBe(100);
  });
});