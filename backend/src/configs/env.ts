import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['Development', 'Test', 'Production']).default('Development'),
  DATABASE_URL: z.string().url(),
});


const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

// Validates and exposes environment variables for the application.
export const env = parsed.data;
