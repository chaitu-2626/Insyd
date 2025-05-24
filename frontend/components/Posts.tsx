// Posts.tsx
'use client';

import React, { useEffect } from "react";
import Link from "next/link";
import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import usePosts from "@/hooks/usePosts"; // Import the usePosts hook
import styles from "@/styles/post.module.css";

interface Props {
  loggedInUserPostOnly: boolean;
  onPostCountChange?: (count: number) => void; // Add the callback prop
}

const Posts = ({ loggedInUserPostOnly, onPostCountChange }: Props) => {
  const { posts, loading, error } = usePosts(loggedInUserPostOnly);

  useEffect(() => {
    if (posts && onPostCountChange) {
       onPostCountChange(posts.length); // Call the callback with the post count
    }
  }, [posts, onPostCountChange]);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (posts.length === 0) {
    return (
      <div className={styles.noPosts}>
        <div className={styles.cameraEmoji}>📸</div>
        <h3 className={styles.noPostsTitle}>No posts yet</h3>
        <p className={styles.noPostsDesc}>
          Share your first get started!
        </p>
        <Link href="/create">
          <button className={styles.btnPrimary}>
            Create Your First Post
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {posts.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

export default Posts;