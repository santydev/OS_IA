import { NextApiRequest, NextApiResponse } from 'next';
import { SystemError } from '../errors/system-error';
import { ErrorHandlerService } from '../services/error-handler.service';

const errorHandler = new ErrorHandlerService();

export function errorMiddleware(
  error: Error,
  req: NextApiRequest,
  res: NextApiResponse
) {
  const systemError = errorHandler.handleError(error);

  if (systemError instanceof SystemError) {
    return res.status(500).json({
      code: systemError.code,
      message: systemError.message,
      severity: systemError.severity
    });
  }

  return res.status(500).json({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred'
  });
}