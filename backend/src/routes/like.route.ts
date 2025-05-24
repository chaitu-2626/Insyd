import { Router } from "express";
import { likePost, unlikePost } from '@controllers';

const likeRoutes = Router();

// Like a post
likeRoutes.post('/:postId', likePost);

// Unlike a post
likeRoutes.delete('/:postId', unlikePost);

export default likeRoutes;