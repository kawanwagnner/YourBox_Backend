import { z } from 'zod';

export const RegisterDTO = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
});

export const LoginDTO = z.object({
  email: z.email(),
  password: z.string().min(6),
});
