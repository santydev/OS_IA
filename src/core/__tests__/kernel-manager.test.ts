import { KernelManager } from '../kernel/kernel-manager';

describe('KernelManager', () => {
  let kernelManager: KernelManager;

  beforeEach(() => {
    kernelManager = KernelManager.getInstance();
  });

  test('should be a singleton', () => {
    const instance2 = KernelManager.getInstance();
    expect(kernelManager).toBe(instance2);
  });

  test('should start system successfully', async () => {
    const startSpy = jest.spyOn(kernelManager.getMessageBus(), 'start');
    await kernelManager.startSystem();
    expect(startSpy).toHaveBeenCalled();
  });

  test('should stop system successfully', async () => {
    const stopSpy = jest.spyOn(kernelManager.getMessageBus(), 'stop');
    await kernelManager.stopSystem();
    expect(stopSpy).toHaveBeenCalled();
  });
});