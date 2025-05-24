import z from 'zod';

export const FollowValidator = z.object({
    followeeId: z.string().min(1, { message: 'Need the Id of the user you want to follow' }), 
});