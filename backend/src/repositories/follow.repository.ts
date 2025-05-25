import { eq, and } from "drizzle-orm";
import BaseRepository from "./base.repository.js";
import { followSchema } from '../schemas/index.js';
import { Follow, InsertFollow, SelectFollow } from '../types/index.js';
import { db } from '../configs/index.js';


type FollowerId = SelectFollow['followerId'];
type FolloweeId = SelectFollow['followeeId'];

class FollowRepository extends BaseRepository<Follow, SelectFollow, InsertFollow> {
    constructor() {
        super(followSchema, followSchema.followeeId);
    }

    async isFollowing(followeeId: FolloweeId) {
        const result = await db
            .select()
            .from(this.table)
            .where(eq(this.table.followeeId, followeeId));

        return result.length > 0;
    }

    async unFollow(followeeId: FolloweeId, followerId: FollowerId) {
        const result = await db
            .delete(this.table)
            .where(
                and(
                    eq(this.table.followerId, followerId),
                    eq(this.table.followeeId, followeeId)
                )
            )
            .returning();

        return result[0];
    }

    async getFollowersCount(followeeId: FolloweeId) {
        const result = await db
            .select()
            .from(this.table)
            .where(eq(this.table.followeeId, followeeId));

        return result.length;
    }

    async getFolloweesCount(followerId: FollowerId) {
        const result = await db
            .select()
            .from(this.table)
            .where(eq(this.table.followerId, followerId));

        return result.length;
    }
}

export default new FollowRepository();