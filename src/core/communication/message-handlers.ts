import { Message } from "./message-bus";
import { SystemError } from "../errors/system-error";
import { ErrorHandlerService } from "../services/error-handler.service";

export class MessageHandlers {
  constructor(private errorHandler: ErrorHandlerService) {}

  handleModuleError(message: Message) {
    if (typeof message.payload !== "object") return;
    
    const error = message.payload as { message: string; code: string };
    this.errorHandler.handleError(
      new SystemError(error.message, error.code, "HIGH", {
        moduleId: message.source,
      })
    );
  }

  handleModuleMetrics(message: Message) {
    // Handle module metrics updates
    console.log(`Received metrics from module ${message.source}:`, message.payload);
  }

  handleModuleStatus(message: Message) {
    // Handle module status changes
    console.log(`Module ${message.source} status changed:`, message.payload);
  }
}