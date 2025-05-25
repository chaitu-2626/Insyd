import { pgTable, text, timestamp, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { postSchema } from './post.schema.js';

export const likeSchema = pgTable('likes', {
    userId: text('user_id').notNull(),

    postId: uuid('post_id').notNull().references(() => postSchema.id, { onDelete: 'cascade' }),

    createdAt: timestamp('created_at').defaultNow()
}, (table) => [
    //A User can like a Post only once 
    primaryKey({ columns: [table.userId, table.postId] })
]);

export const likeRelations = relations(likeSchema, ({ one }) => ({
    post: one(postSchema, { fields: [likeSchema.postId], references: [postSchema.id] }),
}));