import { SessionManager } from './session-manager';
import { SystemError } from '../errors/system-error';

export class SecurityManager {
  private sessionManager: SessionManager;

  constructor() {
    this.sessionManager = new SessionManager();
  }

  async initialize() {
    // Initialize security systems
  }

  async validateAccess(userId: string, resource: string): Promise<boolean> {
    try {
      return await this.sessionManager.checkPermission(userId, resource);
    } catch (error) {
      throw new SystemError(
        'Access validation failed',
        'SECURITY_ERROR',
        'HIGH',
        { userId, resource }
      );
    }
  }

  async validateModuleAccess(userId: string, moduleId: string): Promise<boolean> {
    return this.validateAccess(userId, `module:${moduleId}`);
  }
}