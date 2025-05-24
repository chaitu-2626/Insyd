import BaseRepository from "./base.repository";
import { followSchema } from '@schema';
import { Follow, InsertFollow, SelectFollow } from '@types';
import { eq, and } from "drizzle-orm";
import { db } from '@config';


type FollowerId = SelectFollow['followerId'];
type FolloweeId = SelectFollow['followeeId'];

class FollowRepository extends BaseRepository<Follow, SelectFollow, InsertFollow> {
    constructor() {
        super(followSchema, followSchema.id);
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