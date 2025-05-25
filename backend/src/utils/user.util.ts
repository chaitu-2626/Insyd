import { clerkClient, User } from '@clerk/express';

export const getUserDetailsOfUserId = async (userId: string): Promise<User | null> => {
    const userDetails = await clerkClient.users.getUser(userId);

    return userDetails;
}