import { pgTable, text, timestamp, primaryKey } from 'drizzle-orm/pg-core';

export const likeSchema = pgTable('likes', {
    userId: text('user_id').notNull(),

    postId: text('post_id').notNull(),

    createdAt: timestamp('created_at').defaultNow()
}, (table) => [
    //A User can like a Post only once 
    primaryKey({ columns: [table.userId, table.postId] })
]);