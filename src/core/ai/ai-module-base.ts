import { Module } from '../kernel/types';
import { ModuleCommunication } from '../communication/module-communication';
import { SystemError } from '../errors/system-error';

export abstract class AIModuleBase implements Module {
  protected communication: ModuleCommunication;
  
  constructor(
    public id: string,
    public name: string,
    public type: 'AI',
    protected config: Record<string, unknown>
  ) {
    this.communication = new ModuleCommunication(id);
  }

  abstract initialize(): Promise<void>;
  abstract process(input: unknown): Promise<unknown>;
  abstract train(data: unknown): Promise<void>;
  abstract validate(input: unknown): Promise<boolean>;

  protected async handleError(error: Error) {
    throw new SystemError(
      `AI Module Error: ${error.message}`,
      'AI_MODULE_ERROR',
      'HIGH',
      { moduleId: this.id }
    );
  }
}