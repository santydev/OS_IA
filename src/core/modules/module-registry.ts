import { Module } from '../kernel/types';
import { generateId } from '../utils/id';

export class ModuleRegistry {
  private modules: Map<string, Module> = new Map();

  async register(module: Omit<Module, 'id'>): Promise<Module> {
    const id = generateId();
    const newModule: Module = { ...module, id };
    this.modules.set(id, newModule);
    return newModule;
  }

  async unregister(id: string): Promise<void> {
    this.modules.delete(id);
  }

  async getModule(id: string): Promise<Module | undefined> {
    return this.modules.get(id);
  }

  async listModules(): Promise<Module[]> {
    return Array.from(this.modules.values());
  }
}