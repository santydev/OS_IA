import { Message } from '../message-bus';
import { BaseProtocol } from './base-protocol';
import { SystemError } from '../../errors/system-error';

interface CommandMessage extends Message {
  payload: {
    command: string;
    args?: unknown[];
  };
}

export class CommandProtocol extends BaseProtocol {
  private commands: Map<string, (...args: any[]) => Promise<unknown>>;

  constructor() {
    super();
    this.commands = new Map();
  }

  registerCommand(
    command: string,
    handler: (...args: any[]) => Promise<unknown>
  ) {
    this.commands.set(command, handler);
  }

  async handleMessage(message: Message): Promise<void> {
    if (!this.validateMessage(message)) {
      throw new SystemError(
        'Invalid command message format',
        'INVALID_COMMAND_MESSAGE',
        'MEDIUM',
        { message }
      );
    }

    const commandMessage = message as CommandMessage;
    const handler = this.commands.get(commandMessage.payload.command);

    if (!handler) {
      throw new SystemError(
        `Command not found: ${commandMessage.payload.command}`,
        'COMMAND_NOT_FOUND',
        'MEDIUM',
        { command: commandMessage.payload.command }
      );
    }

    try {
      const result = await handler(...(commandMessage.payload.args || []));
      return result;
    } catch (error) {
      throw new SystemError(
        'Command execution failed',
        'COMMAND_EXECUTION_ERROR',
        'HIGH',
        { originalError: error, command: commandMessage.payload.command }
      );
    }
  }

  override validateMessage(message: Message): boolean {
    return (
      super.validateMessage(message) &&
      typeof (message as CommandMessage).payload?.command === 'string'
    );
  }
}