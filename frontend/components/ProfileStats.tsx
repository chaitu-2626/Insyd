"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import styles from "@/styles/profileStats.module.css";
import { FollowApiService } from "@/services";

interface ProfileStatsProps {
	userId?: string;
	getToken: () => Promise<string | null>;
	postCount: number;
	loadingPosts: boolean;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({
	userId,
	getToken,
	postCount,
	loadingPosts,
}) => {
	const [followersCount, setFollowersCount] = useState<number | null>(null);
	const [followingCount, setFollowingCount] = useState<number | null>(null);
	const [loadingFollowers, setLoadingFollowers] = useState(true);
	const [loadingFollowing, setLoadingFollowing] = useState(true);

	useEffect(() => {
		const fetchFollowersCount = async () => {
			setLoadingFollowers(true);
			try {
				const token = await getToken();
				if (userId && token) {
					const followers = await FollowApiService.getFollowers(
						userId,
						token
					);
					setFollowersCount(followers.count || 0);
				}
			} catch (error) {
				console.error("Error fetching followers count:", error);
				setFollowersCount(null);
			} finally {
				setLoadingFollowers(false);
			}
		};

		fetchFollowersCount();
	}, [userId, getToken]);

	useEffect(() => {
		const fetchFollowingCount = async () => {
			setLoadingFollowing(true);
			try {
				const token = await getToken();
				if (userId && token) {
					const following = await FollowApiService.getFollowing(
						userId,
						token
					);
					setFollowingCount(following.count || 0);
				}
			} catch (error) {
				console.error("Error fetching following count:", error);
				setFollowingCount(null);
			} finally {
				setLoadingFollowing(false);
			}
		};

		fetchFollowingCount();
	}, [userId, getToken]);

	return (
		<div className={styles.stats}>
			<div className={styles.statItem}>
				<p className={styles.statNumber}>
					{loadingPosts ? (
						<Loader2 className={styles.loaderIcon} />
					) : (
						postCount
					)}
				</p>
				<p className={styles.statLabel}>Posts</p>
			</div>
			<div className={styles.statItem}>
				<p className={styles.statNumber}>
					{loadingFollowers ? (
						<Loader2 className={styles.loaderIcon} />
					) : followersCount !== null ? (
						followersCount
					) : (
						"-"
					)}
				</p>
				<p className={styles.statLabel}>Followers</p>
			</div>
			<div className={styles.statItem}>
				<p className={styles.statNumber}>
					{loadingFollowing ? (
						<Loader2 className={styles.loaderIcon} />
					) : followingCount !== null ? (
						followingCount
					) : (
						"-"
					)}
				</p>
				<p className={styles.statLabel}>Following</p>
			</div>
		</div>
	);
};

export default ProfileStats;
