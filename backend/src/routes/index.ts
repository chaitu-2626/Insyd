import { Router } from "express";
import postRouter from "./post.route.js";
import followRouter from "./follow.route.js";
import likeRouter from "./like.route.js";

const router = Router();

router.use('/posts', postRouter);
router.use('/follow', followRouter);
router.use('/like', likeRouter);

export default router;