"use client";

import React, {useState } from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import styles from "./page.module.css";
import Posts from "@/components/Posts";
import { useUserSession } from "@/hooks";
import ProfileStats from "@/components/ProfileStats"; // Import the new component

const Profile: React.FC = () => {
  const [postCount, setPostCount] = useState(0);
  const { userId, user, getUserToken } = useUserSession();
  const [loadingPosts, setLoadingPosts] = useState(true);
console.log(user);
  const handlePostCountChange = (count: number) => {
    setPostCount(count);
    setLoadingPosts(false);
  };

  return (
    <div className={styles.page}>
      {/* Profile Header */}
      <div className={styles.profileHeader}>
        <div className={styles.headerTop}>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <h1 className={styles.username}>{user?.username}</h1>
        </div>

        {/* Stats */}
        <ProfileStats
          userId={userId!}
          getToken={getUserToken}
          postCount={postCount}
          loadingPosts={loadingPosts}
        />
      </div>

      <div className={styles.postsWrapper}>
        <Posts
          loggedInUserPostOnly={true}
          onPostCountChange={handlePostCountChange}
        />
      </div>
    </div>
  );
};

export default Profile;