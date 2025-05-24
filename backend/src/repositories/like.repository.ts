import BaseRepository from "./base.repository";
import { likeSchema } from '@schema';
import { Like, InsertLike, SelectLike } from '@types';

type PostId = SelectLike['postId'];

class LikeRepository extends BaseRepository<Like, SelectLike, InsertLike> {
    constructor() {
        super(likeSchema, likeSchema.postId);
    }

    async likePost({ postId, userId }: InsertLike) {
        return this.create({ postId, userId });
    }

    async unlikePost(postId: PostId) {
        return this.delete(postId);
    }
}

export default new LikeRepository();