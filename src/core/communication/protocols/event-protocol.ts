import { Message } from '../message-bus';
import { BaseProtocol } from './base-protocol';

interface EventMessage extends Message {
  payload: {
    event: string;
    data: unknown;
  };
}

export class EventProtocol extends BaseProtocol {
  private eventHandlers: Map<string, Set<(data: unknown) => Promise<void>>>;

  constructor() {
    super();
    this.eventHandlers = new Map();
  }

  addEventListener(
    event: string,
    handler: (data: unknown) => Promise<void>
  ): () => void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }
    
    this.eventHandlers.get(event)!.add(handler);
    
    return () => {
      const handlers = this.eventHandlers.get(event);
      if (handlers) {
        handlers.delete(handler);
        if (handlers.size === 0) {
          this.eventHandlers.delete(event);
        }
      }
    };
  }

  async handleMessage(message: Message): Promise<void> {
    if (!this.validateMessage(message)) {
      return;
    }

    const eventMessage = message as EventMessage;
    const handlers = this.eventHandlers.get(eventMessage.payload.event);

    if (handlers) {
      await Promise.all(
        Array.from(handlers).map(handler =>
          handler(eventMessage.payload.data)
        )
      );
    }
  }

  override validateMessage(message: Message): boolean {
    return (
      super.validateMessage(message) &&
      typeof (message as EventMessage).payload?.event === 'string'
    );
  }
}