import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { SystemError } from '../errors/system-error';

export class SessionManager {
  static async validateSession(req: Request) {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      throw new SystemError(
        'Unauthorized access',
        'UNAUTHORIZED',
        'HIGH'
      );
    }
    
    return session;
  }
  
  static async validateAdmin(req: Request) {
    const session = await this.validateSession(req);
    
    if (session.user.role !== 'ADMIN') {
      throw new SystemError(
        'Insufficient permissions',
        'FORBIDDEN',
        'HIGH'
      );
    }
    
    return session;
  }
}