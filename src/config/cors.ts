import cors from 'cors';
import { env } from './env.ts';

export const corsMiddleware = cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
});
