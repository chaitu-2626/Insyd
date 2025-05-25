import { Router } from "express";
import {followUser, unfollowUser, getFolloweesCount, getFollowersCount} from '../controllers/index.js';

const followRouter = Router();

followRouter.post('/:followeeId', followUser);
followRouter.delete('/:followeeId', unfollowUser);
followRouter.get('/followers', getFollowersCount);
followRouter.get('/followees', getFolloweesCount);

export default followRouter;