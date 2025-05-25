import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getAuth } from '@clerk/express';
import { FollowRepository } from '../repositories/index.js';
import { success, error, validationError, formatZodErrors } from '../utils/index.js';
import { FollowValidator } from '../validators/index.js';
import { SocketService } from '../services/index.js';
import { NotificationType } from '../types/index.js';
import { getUserDetailsOfUserId } from '../utils/index.js';

export const followUser = async (req: Request, res: Response) => {
    const result = FollowValidator.safeParse(req.params);
    if (!result.success) {
        return validationError(res, formatZodErrors(result.error));
    }

    const followeeId = req.params.followeeId;
    const { userId } = getAuth(req);

    try {
        const data = await FollowRepository.create({ followeeId, followerId: userId! });
        success(res, 'Post liked', data, StatusCodes.CREATED);

        const followee = await getUserDetailsOfUserId(followeeId);
        const notificationCfg = {
            fromUserName: followee?.username ?? 'Some one',
            toUserId: followeeId,
            type: NotificationType.FOLLOW
        }

        SocketService.emit(notificationCfg);
    } catch (err) {
        console.error(err);
        error(res, 'Failed to like post');
    }
};

export const unfollowUser = async (req: Request, res: Response) => {
    const result = FollowValidator.safeParse(req.params);
    if (!result.success) {
        return validationError(res, formatZodErrors(result.error));
    }

    const followeeId = req.params.followeeId;
    const { userId } = getAuth(req);

    try {
        const data = await FollowRepository.unFollow(followeeId, userId!);
        success(res, 'Post un liked', data, StatusCodes.CREATED);
    } catch (err) {
        console.error(err);
        error(res, 'Failed to unlike post');
    }
};

export const isFollowing = async (userId: string) => {
    try {
        const data = await FollowRepository.isFollowing(userId);
        return data ? true : false;
    } catch (err) {
        console.error(err);
    }
}

export const getFollowersCount = async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
    try {
        const data = await FollowRepository.getFollowersCount(userId!);
        success(res, 'Followers fetched successfully', { count: data });
    } catch (err) {
        console.error(err);
        error(res, 'Failed to fetch followers');
    }
}


export const getFolloweesCount = async (req: Request, res: Response) => {
    const { userId } = getAuth(req);

    try {
        const data = await FollowRepository.getFolloweesCount(userId!);
        success(res, 'Followees fetched successfully', { count: data });
    } catch (err) {
        console.error(err);
        error(res, 'Failed to fetch followees');
    }
}