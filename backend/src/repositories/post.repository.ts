import BaseRepository from "./base.repository";
import { postSchema } from '@schema';
import { Post, InsertPost, SelectPost } from '@types';

class PostRepository extends BaseRepository<Post, SelectPost, InsertPost> {
    constructor() {
        super(postSchema, postSchema.authorId);
    }
}

export default new PostRepository();