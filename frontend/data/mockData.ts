import { User, Post } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'johndoe',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Photography enthusiast 📸 | Travel lover ✈️',
    isFollowing: false,
    followers: 1234,
    following: 567,
    posts: 89
  },
  {
    id: '2',
    username: 'sarahjones',
    name: 'Sarah Jones',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b169fb6c?w=150&h=150&fit=crop&crop=face',
    bio: 'Artist & Designer 🎨 | Coffee addict ☕',
    isFollowing: true,
    followers: 2567,
    following: 123,
    posts: 156
  },
  {
    id: '3',
    username: 'mikewilson',
    name: 'Mike Wilson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Tech entrepreneur 💻 | Fitness enthusiast 💪',
    isFollowing: false,
    followers: 3456,
    following: 234,
    posts: 78
  },
  {
    id: '4',
    username: 'emilydavis',
    name: 'Emily Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Food blogger 🍕 | Recipe creator 👩‍🍳',
    isFollowing: false,
    followers: 4567,
    following: 345,
    posts: 234
  },
  {
    id: '5',
    username: 'currentuser',
    name: 'You',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    bio: 'Living life to the fullest 🌟 | Nature lover 🌿',
    isFollowing: false,
    followers: 567,
    following: 123,
    posts: 45
  }
];



export const dummyPosts = [
  {
    id: 1,
    authorId: 1,
    likes: 10,
    title: 'First Dummy Post',
    content: 'This is the content of the first dummy post. It includes some interesting information and details about a particular topic.',
  },
  {
    id: 2,
    authorId: 2,
    likes: 5,
    title: 'Another Great Article',
    content: 'Here you will find the content for the second dummy post. This one might be about a different subject, offering a new perspective or insights.',
  },
  {
    id: 3,
    authorId: 3,
    likes: 15,
    title: 'Exploring Next.js Features',
    content: 'This dummy post could discuss some of the latest and greatest features of Next.js, providing examples and explanations.',
  },
  {
    id: 4,
    authorId: 4,
    likes: 8,
    title: 'React 19 Updates',
    content: 'In this dummy post, we can explore the exciting new features and updates that are expected in React 19.',
  },
  {
    id: 5,
    authorId: 5,
    likes: 0,
    title: 'Best Practices for Web Development',
    content: 'This post could outline some essential best practices that every web developer should follow to write clean, maintainable, and efficient code.',
  },
];


export const currentUser = mockUsers[4];