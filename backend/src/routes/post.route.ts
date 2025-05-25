import { Router } from 'express';
import {getAllPost, getLoggedInUserPosts, getPostsByUserId, createPost} from '../controllers/index.js';

const postRouter = Router();

// Get all posts
postRouter.get('/', getAllPost);
postRouter.get('/me', getLoggedInUserPosts);
postRouter.get('/:authorId', getPostsByUserId);

// Create a new post
postRouter.post('/', createPost);



export default postRouter;
