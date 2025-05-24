import { pgTable, uuid, text, boolean, index } from 'drizzle-orm/pg-core';

export const userSessions = pgTable('user_sessions', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: text('user_id').notNull(),
	socketId: text('socket_id'),
	isOnline: boolean('is_online').default(true)
}, (table) => [
	index('idx_userSession_user_id').on(table.userId),
	index('idx_userSession_socket_id').on(table.socketId)
]);
