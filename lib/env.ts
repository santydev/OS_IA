import { z } from "zod"

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1),
  
  // Next Auth
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(1),
  
  // OpenAI
  OPENAI_API_KEY: z.string().min(1),
  OPENAI_ORGANIZATION_ID: z.string().optional(),
  OPENAI_MODEL: z.string().default("gpt-4"),
  OPENAI_MAX_TOKENS: z.coerce.number().default(2000),
  
  // General
  NODE_ENV: z.enum(["development", "production", "test"]),
})

export const env = envSchema.parse(process.env)