import { z } from 'zod';

// Optional helper function for formatting
export const formatZodErrors = (zodError: z.ZodError) => {
  return zodError.errors.map((e) => ({
    field: e.path.join('.'),
    message: e.message,
  }));
};