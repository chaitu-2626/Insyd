// app/components/LikeButton.js (Client Component)
"use client";

import styles from "@/styles/likeButton.module.css";
import { useState } from "react";

interface Props {
	postId: string;
	initialLikes: number;
}

const LikeButton = ({ postId, initialLikes }: Props) => {
	const [likes, setLikes] = useState(initialLikes);
	const [isLiked, setIsLiked] = useState(false);

	const handleLike = () => {
		setIsLiked(!isLiked);
		setLikes(isLiked ? likes - 1 : likes + 1);
		console.log(`Toggled like for post ID: ${postId}`);
		// In a real application, you would make an API call here
	};

	return (
		<div className={styles.likeContainer}>
			<button
				onClick={handleLike}
				className={`${styles.likeButton} ${
					isLiked ? styles.liked : styles.unliked
				}`}
			>
				{isLiked ? "Unlike" : "Like"}
			</button>
			<span className={styles.likeCount}>{likes} likes</span>
		</div>
	);
};

export default LikeButton;
