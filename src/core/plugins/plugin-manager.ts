import { EventEmitter } from 'events';
import { SystemError } from '../errors/system-error';

export interface Plugin {
  id: string;
  name: string;
  version: string;
  initialize(): Promise<void>;
  destroy(): Promise<void>;
}

export class PluginManager extends EventEmitter {
  private plugins: Map<string, Plugin> = new Map();

  async loadPlugin(plugin: Plugin): Promise<void> {
    try {
      if (this.plugins.has(plugin.id)) {
        throw new Error(`Plugin ${plugin.id} already loaded`);
      }

      await plugin.initialize();
      this.plugins.set(plugin.id, plugin);
      this.emit('plugin:loaded', plugin.id);
    } catch (error) {
      throw new SystemError(
        `Failed to load plugin ${plugin.id}`,
        'PLUGIN_LOAD_ERROR',
        'HIGH',
        { pluginId: plugin.id }
      );
    }
  }

  async unloadPlugin(pluginId: string): Promise<void> {
    const plugin = this.plugins.get(pluginId);
    if (plugin) {
      await plugin.destroy();
      this.plugins.delete(pluginId);
      this.emit('plugin:unloaded', pluginId);
    }
  }

  getPlugin(pluginId: string): Plugin | undefined {
    return this.plugins.get(pluginId);
  }

  getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }
}