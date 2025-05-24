import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PostRepository } from '@repository';
import { success, error, validationError, formatZodErrors } from '@utils';
import { CreatePostSchema, GetPostById } from '@validators';
import { getAuth, clerkClient } from '@clerk/express';
import { SelectPost } from '@types';
import {isFollowing} from './follow.controller';


export const getAllPost = async (req: Request, res: Response) => {
      const { userId } = getAuth(req);
    try {
        const posts = await PostRepository.getAllPosts(userId!);
        if(posts.length === 0) {
            success(res, 'Posts fetched successfully', []);
            return;
        }
        const postWithUserDetails = await getPostsWithUserDetails(posts);
        success(res, 'Posts fetched successfully', postWithUserDetails);
    } catch (err) {
        console.error(err);
        error(res, 'Failed to fetch posts');
    }
};

const getPostsWithUserDetails = async (posts: SelectPost[]) => {

    const userMap = new Map();

    const postWithUserData = await Promise.all(
        posts.map(async (post) => {
            if (userMap.has(post.authorId)) {
                return {
                    ...post,
                    author: userMap.get(post.authorId)
                };
            }

            const user = await clerkClient.users.getUser(post.authorId);
            const isAuthorFollowing = await isFollowing(post.authorId);

            userMap.set(post.authorId, { ...user, isFollowing: isAuthorFollowing });
            return {
                ...post,
                author: user
            };
        })
    );

    return postWithUserData;
}

export const getLoggedInUserPosts = async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
    try {
        const posts = await PostRepository.getById(userId!);
        success(res, 'Posts fetched successfully', posts);
    } catch (err) {
        console.error(err);
        error(res, 'Failed to fetch posts');
    }
}

export const getPostsByUserId = async (req: Request, res: Response) => {
    const result = GetPostById.safeParse(req.params);
    if (!result.success) {
        return validationError(res, formatZodErrors(result.error));
    }

    const authorId = req.params.authorId;
    try {
        const posts = await PostRepository.getById(authorId);
        success(res, 'Posts fetched successfully', posts);
    } catch (err) {
        console.error(err);
        error(res, 'Failed to fetch posts');
    }
}

export const createPost = async (req: Request, res: Response) => {
    const result = CreatePostSchema.safeParse(req.body);
    if (!result.success) {
        return validationError(res, formatZodErrors(result.error));
    }

    const { title, content } = result.data;
    const { userId } = getAuth(req);

    try {
        const post = await PostRepository.create({
            authorId: userId!,
            title,
            content
        });

        success(res, 'Post created successfully', post, StatusCodes.CREATED);
    } catch (err) {
        console.error(err);
        error(res, 'Failed to create post');
    }
}


