import { prisma } from '@/lib/db';
import { SystemError } from '@/core/errors/system-error';

export class DatabaseSetup {
  async testConnection(config: {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
  }): Promise<boolean> {
    const url = `postgresql://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;
    
    try {
      await prisma.$connect();
      await prisma.$disconnect();
      return true;
    } catch (error) {
      throw new SystemError(
        'Database connection failed',
        'DB_CONNECTION_ERROR',
        'HIGH',
        { config: { ...config, password: '***' } }
      );
    }
  }

  async initializeTables(): Promise<void> {
    try {
      await prisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Les migrations Prisma seront exécutées automatiquement
    } catch (error) {
      throw new SystemError(
        'Failed to initialize database tables',
        'DB_INIT_ERROR',
        'HIGH',
        { error }
      );
    }
  }
}