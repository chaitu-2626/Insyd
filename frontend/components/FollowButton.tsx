"use client";

import styles from "@/styles/followButton.module.css";
import { toast } from "react-toastify";
import { useState, useCallback, useRef } from "react";
import { FollowApiService } from "@/services";
import { useUserSession } from "@/hooks";

interface Props {
	authorId: string;
	following: boolean;
}

const FollowButton = ({ authorId, following }: Props) => {
	const [isFollowing, setIsFollowing] = useState(following);
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
				const data = await FollowApiService.unFollowUser(
					authorId,
					token
				);
				console.log(data);
				if (data && data.success === true) {
					setIsFollowing(false);
				}
				return;
			}

			const data = await FollowApiService.followUser(authorId, token);
			if (data && data.success === true) {
				setIsFollowing(true);
			}
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
		</>
	);
};

export default FollowButton;
