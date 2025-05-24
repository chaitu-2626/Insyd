import { pgTable, uuid, text, timestamp, primaryKey, boolean } from 'drizzle-orm/pg-core';

export const followSchema = pgTable('follows', {
	id: uuid('id')
		.defaultRandom(),

	followerId: text('follower_id').notNull(),

	followeeId: text('followee_id').notNull(),

	createdAt: timestamp('created_at').defaultNow(),

	accepted: boolean('accepted').default(false)
},
	(table) => [
		//A User can follow another User only once
		primaryKey({ columns: [table.followerId, table.followeeId] }),
	]
);