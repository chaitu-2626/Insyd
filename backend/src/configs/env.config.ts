import dotenv from 'dotenv';
import { z } from 'zod';
import { Environment } from '@types';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.nativeEnum(Environment).default(Environment.Development),
  DATABASE_URL: z.string(),
  CLERK_PUBLISHABLE_KEY: z.string().min(1, 'CLERK_PUBLISHABLE_KEY is required'),
  CLERK_SECRET_KEY: z.string().min(1, 'CLERK_SECRET_KEY is required'),
  NEXT_PUBLIC_FRONTEND_URL: z.string().url().optional(),
  PORT: z
    .string()
    .transform((val) => (val ? Number(val) : 3000))
    .refine((val) => !isNaN(val) && val > 0, 'PORT must be a positive number')
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

export type Env = z.infer<typeof envSchema>;
export const env = parsed.data;
