import { Plugin } from './plugin-manager';
import { SystemError } from '../errors/system-error';

export abstract class PluginBase implements Plugin {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly version: string
  ) {}

  abstract initialize(): Promise<void>;
  abstract destroy(): Promise<void>;

  protected handleError(error: Error): never {
    throw new SystemError(
      `Plugin Error: ${error.message}`,
      'PLUGIN_ERROR',
      'HIGH',
      { pluginId: this.id }
    );
  }
}