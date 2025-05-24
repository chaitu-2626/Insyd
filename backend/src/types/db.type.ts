import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { postSchema, likeSchema } from "@schema";


export type Post = typeof postSchema;
export type SelectPost = InferSelectModel<typeof postSchema>;
export type InsertPost = InferInsertModel<typeof postSchema>;

export type Like = typeof likeSchema;
export type SelectLike = InferSelectModel<typeof likeSchema>;
export type InsertLike = InferInsertModel<typeof likeSchema>;