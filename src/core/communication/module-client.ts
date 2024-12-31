import { MessageBus, Message } from "./message-bus";

export class ModuleClient {
  private messageBus: MessageBus;
  private moduleId: string;

  constructor(moduleId: string) {
    this.moduleId = moduleId;
    this.messageBus = MessageBus.getInstance();
  }

  send(target: string, type: string, payload: unknown) {
    this.messageBus.publish({
      type,
      payload,
      source: this.moduleId,
      target,
    });
  }

  broadcast(type: string, payload: unknown) {
    this.messageBus.publish({
      type,
      payload,
      source: this.moduleId,
    });
  }

  subscribe(callback: (message: Message) => void) {
    return this.messageBus.subscribe(this.moduleId, callback);
  }
}