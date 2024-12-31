import { z } from 'zod';

const envSchema = z.object({
  // App
  NODE_ENV: z.enum(['development', 'production', 'test']),
  
  // Database
  DATABASE_URL: z.string().min(1),
  
  // Auth
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(1),
  
  // Monitoring
  MONITORING_INTERVAL: z.coerce.number().default(5000),
  ALERT_WEBHOOK_URL: z.string().url().optional(),
  ALERT_EMAIL_TO: z.string().email().array().optional(),
  ALERT_EMAIL_FROM: z.string().email().optional(),
  
  // System
  MAX_CPU_THRESHOLD: z.coerce.number().default(80),
  MAX_MEMORY_THRESHOLD: z.coerce.number().default(80),
});

export const env = envSchema.parse(process.env);