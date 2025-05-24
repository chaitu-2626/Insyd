import { pgEnum, pgTable, uuid, text, boolean, timestamp,index } from 'drizzle-orm/pg-core';

export const notificationTypeEnum = pgEnum('notification_type', ['follow', 'like']);

export const notificationSchema = pgTable('notifications', {
    id: uuid('id').defaultRandom().primaryKey(),

    userId: text('user_id').notNull(),

    actorId: text('actor_id').notNull(),

    type: notificationTypeEnum().notNull(),

    createdAt: timestamp('created_at').defaultNow(),

    read: boolean('read').default(false),
}, (table) => [
    index('idx_notification_user_id').on(table.userId)
]);
