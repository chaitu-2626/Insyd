import { z } from 'zod';

export const CreatePostSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(255, { message: 'Title must be at most 255 characters' }), // matches varchar(255)
    
  content: z
    .string()
    .min(1, { message: 'Content is required' }),

  authorId: z
    .string()
    .min(1, { message: 'Author ID is required' }), // assuming Clerk user ID (text)
});
