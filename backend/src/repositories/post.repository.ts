import BaseRepository from "./base.repository";
import { postSchema } from '@schema';
import { Post, InsertPost, SelectPost } from '@types';
import { not, eq } from "drizzle-orm";
import { db } from '@config';

type AuthorId = SelectPost['authorId'];

class PostRepository extends BaseRepository<Post, SelectPost, InsertPost> {
    constructor() {
        super(postSchema, postSchema.authorId);
    }

    public async getAllPosts(authorId: AuthorId): Promise<SelectPost[]> {
        const result = await db
            .select()
            .from(this.table)
            .where(not(eq(this.table.authorId, authorId)));

        return result;
    }
}

export default new PostRepository();