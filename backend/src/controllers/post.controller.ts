import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getAuth } from '@clerk/express';
import { PostRepository } from '../repositories/index.js';
import { success, error, validationError, formatZodErrors, getUserDetailsOfUserId } from '../utils/index.js';
import { CreatePostSchema, GetPostById } from '../validators/index.js';
import { SelectPost } from '../types/index.js';
import { isFollowing } from './follow.controller.js';


export const getAllPost = async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
    try {
        const posts = await PostRepository.getAllPosts(userId!);
        if (posts.length === 0) {
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

            const user = await getUserDetailsOfUserId(post.authorId);
            const isAuthorFollowing = await isFollowing(post.authorId);

            const updatedUserDetails = { ...user, isFollowing: isAuthorFollowing };
            userMap.set(post.authorId, updatedUserDetails);
            return {
                ...post,
                author: updatedUserDetails
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

export const getAuthorDetailsOfPost = async (postId: string) => {
    const post = await PostRepository.getPostByPostId(postId);
    
    if (!post) {
        return null;
    }

    const authorId = post.authorId;
    const authorDetails = await getUserDetailsOfUserId(authorId);

    return authorDetails;
}


