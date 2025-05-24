export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio: string;
  isFollowing: boolean;
  followers: number;
  following: number;
  posts: number;
}

export interface Post {
  id: string;
	authorId: string;
  likes: number;
	title: string;
	content: string;
  author: {
    username: string;
    imageUrl: string;
  };
}

export interface BaseNotification {
  id: string;
  timestamp: string;
  isRead: boolean;
  type: string;
}

export interface LikeNotification extends BaseNotification {
  type: 'like';
  user: User;
  postId: string;
}

export interface FollowRequestNotification extends BaseNotification {
  type: 'follow_request';
  user: User;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface FollowNotification extends BaseNotification {
  type: 'follow';
  user: User;
}

export interface CreatePostPayload {
	authorId: string;
	title: string;
	content: string;
}


export type Notification = LikeNotification | FollowRequestNotification | FollowNotification;
