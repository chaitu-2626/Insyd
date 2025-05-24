"use client";

import styles from "@/styles/followButton.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useState, useCallback, useRef } from "react";
import { FollowApiService } from "@/services";
import { useUserSession } from "@/hooks";

interface Props {
	authorId: string;
}

const FollowButton = ({ authorId }: Props) => {
	const [isFollowing, setIsFollowing] = useState(false);
	const hasPendingRequest = useRef(false);

	const { getUserToken } = useUserSession();

	const handleFollow = useCallback(async () => {
		if (hasPendingRequest.current) return;

		const message = `Failed to ${
			isFollowing ? "unfollow" : "follow"
		} user.`;

		hasPendingRequest.current = true;
		try {
			const token = await getUserToken();
			if (!token) throw new Error("Authentication token not found.");

			if (isFollowing) {
				await FollowApiService.unFollowUser(authorId, token);
				setIsFollowing(false);
				return;
			}

			await FollowApiService.followUser(authorId, token);
			setIsFollowing(true);
		} catch (error) {
			console.error(message, error);
			toast.error(message);
		} finally {
			hasPendingRequest.current = false;
		}
	}, [authorId, getUserToken, isFollowing, hasPendingRequest]);

	return (
		<>
			<button
				onClick={handleFollow}
				className={`${styles.followButton} ${
					isFollowing ? styles.following : styles.notFollowing
				}`}
			>
				{isFollowing ? "Unfollow" : "Follow"}
			</button>
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
};

export default FollowButton;
