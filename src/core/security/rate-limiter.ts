import { NextApiRequest, NextApiResponse } from 'next';
import { SystemError } from '../errors/system-error';

const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100;

const requestCounts = new Map<string, number[]>();

export function rateLimiter(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const now = Date.now();
  
  if (!requestCounts.has(ip as string)) {
    requestCounts.set(ip as string, []);
  }
  
  const requests = requestCounts.get(ip as string)!;
  const windowStart = now - WINDOW_SIZE;
  
  // Remove old requests
  while (requests.length > 0 && requests[0] < windowStart) {
    requests.shift();
  }
  
  if (requests.length >= MAX_REQUESTS) {
    throw new SystemError(
      'Too many requests',
      'RATE_LIMIT_EXCEEDED',
      'MEDIUM',
      { ip }
    );
  }
  
  requests.push(now);
  next();
}