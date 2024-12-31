import { Kernel } from './kernel';
import { ModuleRegistry } from '../modules/module-registry';
import { ResourceManager } from '../resources/resource-manager';
import { MessageBus } from '../communication/message-bus';
import { SystemMonitor } from '../monitoring/system-monitor';
import { SecurityManager } from '../security/security-manager';

export class KernelManager {
  private static instance: KernelManager;
  private kernel: Kernel;
  private moduleRegistry: ModuleRegistry;
  private resourceManager: ResourceManager;
  private messageBus: MessageBus;
  private monitor: SystemMonitor;
  private securityManager: SecurityManager;

  private constructor() {
    this.kernel = new Kernel();
    this.moduleRegistry = new ModuleRegistry();
    this.resourceManager = new ResourceManager();
    this.messageBus = MessageBus.getInstance();
    this.monitor = new SystemMonitor();
    this.securityManager = new SecurityManager();
  }

  static getInstance(): KernelManager {
    if (!KernelManager.instance) {
      KernelManager.instance = new KernelManager();
    }
    return KernelManager.instance;
  }

  async startSystem() {
    await this.securityManager.initialize();
    await this.resourceManager.initialize();
    await this.moduleRegistry.loadModules();
    this.monitor.startMonitoring();
    this.messageBus.start();
  }

  async stopSystem() {
    await this.moduleRegistry.unloadModules();
    this.monitor.stopMonitoring();
    this.messageBus.stop();
  }

  getKernel() { return this.kernel; }
  getModuleRegistry() { return this.moduleRegistry; }
  getResourceManager() { return this.resourceManager; }
  getMessageBus() { return this.messageBus; }
  getMonitor() { return this.monitor; }
  getSecurityManager() { return this.securityManager; }
}