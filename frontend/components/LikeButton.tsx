'use client';

import styles from '@/styles/likeButton.module.css';
import { useState, useRef, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useUserSession } from '@/hooks';
import { LikeApiService } from '@/services';

interface Props {
  postId: string;
  initialLikes: number;
  likedByLoggedInUser: boolean
}

const LikeButton = ({ postId, initialLikes, likedByLoggedInUser}: Props) => {
  // Mirror prop changes if needed
  const [likes, setLikes] = useState(initialLikes);
  useEffect(() => {
    setLikes(initialLikes);
  }, [initialLikes]);

  const [isLiked, setIsLiked] = useState(likedByLoggedInUser);
  const isPending = useRef(false);
  const { getUserToken } = useUserSession();

  const handleLike = useCallback(async () => {
    if (isPending.current) return;

    isPending.current = true;
    const action = isLiked ? 'unlike' : 'like';
    const failureMessage = `Failed to ${action} post.`;

    try {
      const token = await getUserToken();
      if (!token) throw new Error('Authentication token not found.');

      if (isLiked) {
        const { success } = await LikeApiService.unLikePost(postId, token);
        if (success) {
          setLikes((l) => l - 1);
          setIsLiked(false);
        } else {
          throw new Error('API responded with failure.');
        }
      } else {
        const { success } = await LikeApiService.likePost(postId, token);
        if (success) {
          setLikes((l) => l + 1);
          setIsLiked(true);
        } else {
          throw new Error('API responded with failure.');
        }
      }
    } catch (err) {
      console.error(failureMessage, err);
      toast.error(failureMessage);
    } finally {
      isPending.current = false;
    }
  }, [postId, getUserToken, isLiked]);

  return (
    <div className={styles.likeContainer}>
      <button
        onClick={handleLike}
        disabled={isPending.current}
        className={`${styles.likeButton} ${
          isLiked ? styles.liked : styles.unliked
        }`}
      >
        {isPending.current
          ? '...'
          : isLiked
          ? 'Unlike'
          : 'Like'}
      </button>
      <span className={styles.likeCount}>{likes} like{likes !== 1 && 's'}</span>
    </div>
  );
};

export default LikeButton;
