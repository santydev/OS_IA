import { EventEmitter } from "events";

export interface Message {
  type: string;
  payload: unknown;
  source: string;
  target?: string;
  timestamp: Date;
}

export class MessageBus extends EventEmitter {
  private static instance: MessageBus;

  private constructor() {
    super();
  }

  static getInstance(): MessageBus {
    if (!MessageBus.instance) {
      MessageBus.instance = new MessageBus();
    }
    return MessageBus.instance;
  }

  publish(message: Omit<Message, "timestamp">) {
    const fullMessage: Message = {
      ...message,
      timestamp: new Date(),
    };
    this.emit("message", fullMessage);
    if (message.target) {
      this.emit(`message:${message.target}`, fullMessage);
    }
  }

  subscribe(moduleId: string, callback: (message: Message) => void) {
    this.on(`message:${moduleId}`, callback);
    return () => this.unsubscribe(moduleId, callback);
  }

  unsubscribe(moduleId: string, callback: (message: Message) => void) {
    this.off(`message:${moduleId}`, callback);
  }
}