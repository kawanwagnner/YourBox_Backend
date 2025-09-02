import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  JWT_SECRET: z.string().min(8),
  CORS_ORIGIN: z.string().url(),
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
