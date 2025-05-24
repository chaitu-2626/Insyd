import { Request, Response } from 'express';
import { LikeRepository } from '@repository';
import { getAuth } from '@clerk/express';
import { success, error, validationError, formatZodErrors } from '@utils';
import { LikeAndUnLikePost } from '@validators';

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