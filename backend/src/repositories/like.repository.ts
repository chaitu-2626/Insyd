import { eq, and } from "drizzle-orm";
import BaseRepository from "./base.repository.js";
import { likeSchema } from '../schemas/index.js';
import { Like, InsertLike, SelectLike } from '../types/index.js';
import { db } from '../configs/index.js';

type PostId = SelectLike['postId'];
type UserId = SelectLike['userId'];

class LikeRepository extends BaseRepository<Like, SelectLike, InsertLike> {
    constructor() {
        super(likeSchema, likeSchema.postId);
    }

    async unLikePost(postId: PostId, userId: UserId) {
        const result = await db
            .delete(this.table)
            .where(
                and(
                    eq(this.table.postId, postId),
                    eq(this.table.userId, userId)
                )
            )
            .returning();

        return result[0];
    }
}

export default new LikeRepository();