import { relations } from 'drizzle-orm';
import { pgTable, uuid, text, timestamp, index, varchar } from 'drizzle-orm/pg-core';
import { likeSchema } from './likes.schema.js';

export const postSchema = pgTable('posts', {
	id: uuid('id').defaultRandom().primaryKey(),
	authorId: text('author_id').notNull(),
	title: varchar('title', { length: 256 }).notNull(),
	content: text('content').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
}, (table) => [
	index('idx_post_author_id').on(table.authorId)
]);

//Allows to get post author and likes details
export const postRelations = relations(postSchema, ({ many }) => ({
	likes: many(likeSchema),
}));