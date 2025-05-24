import { Router } from "express";
import {followUser, unfollowUser, getFolloweesCount, getFollowersCount} from '@controllers';

const followRouter = Router();

followRouter.post('/:userId', followUser);
followRouter.delete('/:userId', unfollowUser);
followRouter.get('/followers', getFollowersCount);
followRouter.get('/followees', getFolloweesCount);

export default followRouter;