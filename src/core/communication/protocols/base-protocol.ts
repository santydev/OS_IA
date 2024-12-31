import { Message } from '../message-bus';

export interface ProtocolHandler {
  handleMessage(message: Message): Promise<void>;
  validateMessage(message: Message): boolean;
}

export abstract class BaseProtocol implements ProtocolHandler {
  abstract handleMessage(message: Message): Promise<void>;
  
  validateMessage(message: Message): boolean {
    return (
      typeof message.type === 'string' &&
      message.source !== undefined &&
      message.timestamp instanceof Date
    );
  }

  protected createResponse(originalMessage: Message, payload: unknown): Message {
    return {
      type: `${originalMessage.type}_response`,
      payload,
      source: originalMessage.target!,
      target: originalMessage.source,
      timestamp: new Date()
    };
  }
}