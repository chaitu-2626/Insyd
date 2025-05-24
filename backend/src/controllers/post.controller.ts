import { Request, Response } from 'express';
import { PostRepository, LikeRepository } from '@repo/db';
import { success, error, validationError, formatZodErrors } from '@utils';
import { CreatePostSchema } from '@validators';

export async function createPost(req: Request, res: Response) {
    const result = CreatePostSchema.safeParse(req.body);
    if (!result.success) {
        return validationError(res, formatZodErrors(result.error));
    }

    const { title, content } = result.data;
    const { userId } = req as any;

    const postData = {
        authorId: userId,
        title,
        content,
    };

    try {
        const post = await PostRepository.createPost(postData);
        return success(res, 'Post created successfully', post, 201);
    } catch (err) {
        console.error(err);
        return error(res, 'Failed to create post');
    }
}

export async function likePost(req: Request, res: Response) {
    const postId = req.params.id;
    const { userId } = req as any;

    try {
        await LikeRepository.likePost({ postId, userId });
        return success(res, 'Post liked');
    } catch (err) {
        console.error(err);
        return error(res, 'Failed to like post');
    }
}

export async function unlikePost(req: Request, res: Response) {
    const postId = req.params.id;

    try {
        await LikeRepository.unlikePost(postId);
        return success(res, 'Post unliked');
    } catch (err) {
        console.error(err);
        return error(res, 'Failed to unlike post');
    }
}
