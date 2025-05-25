import { Router, Request, Response } from "express";
import postRouter from "./post.route";
import followRouter from "./follow.route";
import likeRouter from "./like.route";

const router = Router();

// Health check route — public
router.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
});

router.use('/posts', postRouter);
router.use('/follow', followRouter);
router.use('/like', likeRouter);

export default router;