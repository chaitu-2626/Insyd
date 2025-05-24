import { Router } from 'express';
import {createPost, likePost, unlikePost} from '@controllers';

const router = Router();

// Create a new post
router.post('/', createPost);

// Like a post
router.post('/:id/like', likePost);

// Unlike a post
router.delete('/:id/like', unlikePost);

export default router;
