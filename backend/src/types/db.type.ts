import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { postSchema, likeSchema, followSchema } from "../schemas/index.js";


export type Post = typeof postSchema;
export type SelectPost = InferSelectModel<typeof postSchema>;
export type InsertPost = InferInsertModel<typeof postSchema>;

export type Like = typeof likeSchema;
export type SelectLike = InferSelectModel<typeof likeSchema>;
export type InsertLike = InferInsertModel<typeof likeSchema>;

export type Follow = typeof followSchema;
export type SelectFollow = InferSelectModel<typeof followSchema>;
export type InsertFollow = InferInsertModel<typeof followSchema>;