import { ModuleClient } from './module-client';
import { CommandProtocol } from './protocols/command-protocol';
import { EventProtocol } from './protocols/event-protocol';
import { Message } from './message-bus';
import { SystemError } from '../errors/system-error';

export class ModuleCommunication {
  private client: ModuleClient;
  private commandProtocol: CommandProtocol;
  private eventProtocol: EventProtocol;

  constructor(moduleId: string) {
    this.client = new ModuleClient(moduleId);
    this.commandProtocol = new CommandProtocol();
    this.eventProtocol = new EventProtocol();

    this.setupMessageHandler();
  }

  private setupMessageHandler() {
    this.client.subscribe(async (message: Message) => {
      try {
        if (message.type.startsWith('cmd:')) {
          await this.commandProtocol.handleMessage(message);
        } else if (message.type.startsWith('evt:')) {
          await this.eventProtocol.handleMessage(message);
        }
      } catch (error) {
        if (error instanceof SystemError) {
          this.client.send(message.source, 'error', {
            code: error.code,
            message: error.message,
            severity: error.severity
          });
        }
      }
    });
  }

  registerCommand(
    command: string,
    handler: (...args: any[]) => Promise<unknown>
  ) {
    this.commandProtocol.registerCommand(command, handler);
  }

  addEventListener(
    event: string,
    handler: (data: unknown) => Promise<void>
  ): () => void {
    return this.eventProtocol.addEventListener(event, handler);
  }

  async executeCommand(
    target: string,
    command: string,
    ...args: unknown[]
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const messageId = Date.now().toString();
      
      const cleanup = this.addEventListener(`${command}_response`, (response) => {
        cleanup();
        resolve(response);
      });

      this.client.send(target, `cmd:${command}`, {
        command,
        args,
        messageId
      });

      // Timeout after 5 seconds
      setTimeout(() => {
        cleanup();
        reject(new Error(`Command execution timed out: ${command}`));
      }, 5000);
    });
  }

  emitEvent(event: string, data: unknown) {
    this.client.broadcast(`evt:${event}`, {
      event,
      data
    });
  }
}