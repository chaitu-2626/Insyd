import BaseRepository from "./base.repository";
import { likeSchema } from '@schema';
import { Like, InsertLike, SelectLike } from '@types';
import { eq, and } from "drizzle-orm";
import { db } from '@config';

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