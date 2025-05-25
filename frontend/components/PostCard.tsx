// app/components/PostCard.js (Server Component)

import styles from "@/styles/postCard.module.css";
import FollowButton from "./FollowButton";
import LikeButton from "./LikeButton";
import { Post, Like } from "@/types";
import { useUserSession } from "@/hooks";

const PostCard = ({ post }: { post: Post }) => {
	const { userId } = useUserSession();
	console.log(post);
	const isFollowing = post?.author?.isFollowing ?? false;

	const likedByLoggedInUser = post?.likes?.some((like: Like) => like.userId === userId);

	return (
		<div className={styles.card}>
			{userId !== post.authorId && (
				<div className={styles.postHeader}>
					<h3 className={styles.authorName}>
						{post.author?.username}
					</h3>
					<FollowButton authorId={post.authorId} following={isFollowing} />
				</div>
			)}

			<h2 className={styles.title}>{post.title}</h2>
			<p className={styles.description}>{post.content}</p>
			<div className={styles.actions}>
				<LikeButton postId={post.id} initialLikes={post?.likes?.length ?? 0} likedByLoggedInUser={likedByLoggedInUser}/>
			</div>
		</div>
	);
};

export default PostCard;
