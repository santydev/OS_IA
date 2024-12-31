export class SystemError extends Error {
  constructor(
    message: string,
    public code: string,
    public severity: 'LOW' | 'MEDIUM' | 'HIGH',
    public metadata?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'SystemError';
  }
}