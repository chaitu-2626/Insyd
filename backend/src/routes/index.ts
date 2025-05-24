import { Router } from "express";
import postRouter from "./post.route";
import followRouter from "./follow.route";
import likeRouter from "./like.route";

const router = Router();

router.use('/posts', postRouter);
router.use('/follow', followRouter);
router.use('/like', likeRouter);

export default router;