import { Request, Response } from 'express';
import { getAuth } from '@clerk/express';
import { LikeRepository } from '../repositories/index.js';
import { success, error, validationError, formatZodErrors, getUserDetailsOfUserId } from '../utils/index.js';
import { LikeAndUnLikePost } from '../validators/index.js';
import { SocketService } from '../services/index.js';
import { NotificationType } from '../types/index.js';
import { getAuthorDetailsOfPost } from './post.controller.js';

export const likePost = async (req: Request, res: Response) => {
    const result = LikeAndUnLikePost.safeParse(req.params);
    if (!result.success) {
        return validationError(res, formatZodErrors(result.error));
    }

    const { postId } = req.params;
    const { userId } = getAuth(req);

    try {
        const data = await LikeRepository.create({ postId, userId: userId! });
        success(res, 'Post liked', data);

        
        const userDetails = await getUserDetailsOfUserId(userId!);
        const toUserDetails = await getAuthorDetailsOfPost(postId);
        const notificationCfg = {
            fromUserName: userDetails?.username ?? 'Some one',
            toUserId: toUserDetails?.id!,
            type: NotificationType.LIKE
        }

        SocketService.emit(notificationCfg);
    } catch (err) {
        console.error(err);
        error(res, 'Failed to like post');
    }
}

export const unlikePost = async (req: Request, res: Response) => {
    const result = LikeAndUnLikePost.safeParse(req.params);
    if (!result.success) {
        return validationError(res, formatZodErrors(result.error));
    }

    const { postId } = req.params;
    const { userId } = getAuth(req);

    try {
        const data = await LikeRepository.unLikePost(postId, userId!);
        success(res, 'Post unliked', data);
    } catch (err) {
        console.error(err);
        error(res, 'Failed to unlike post');
    }
}