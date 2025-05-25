import { eq } from "drizzle-orm";
import BaseRepository from "./base.repository.js";
import { postSchema } from '../schemas/index.js';
import { Post, InsertPost, SelectPost } from '../types/index.js';
import { db } from '../configs/index.js';

type AuthorId = SelectPost['authorId'];
type PostId = SelectPost['id'];

class PostRepository extends BaseRepository<Post, SelectPost, InsertPost> {
    constructor() {
        super(postSchema, postSchema.authorId);
    }

    public async getPostByPostId(postId: PostId) {
          const result = await db
              .select()
              .from(this.table)
              .where(eq(this.table.id, postId));
  
          return result[0];
      }
  
    public async getAllPosts(authorId: AuthorId): Promise<SelectPost[]> {
        const result = await db.query.postSchema.findMany({
            where: (fields, { ne }) => ne(fields.authorId, authorId),
            with: {
                likes: true
            },
        });

        return result;
    }
}

export default new PostRepository();