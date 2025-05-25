// enums/NotificationType.ts
export enum NotificationType {
  FOLLOW = 'follow',
  LIKE = 'like'
}

export interface NotificationPayload {
    toUserId: string;
    fromUserName: string;
    type: NotificationType;
}
