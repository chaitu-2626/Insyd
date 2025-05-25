// enums/NotificationType.ts
export enum NotificationType {
  FOLLOW = 'follow',
  LIKE = 'like',
  NEW_POST = 'new_post',
}

export interface NotificationPayload {
    toUserId: string;
    fromUserName: string;
    type: NotificationType;
}
