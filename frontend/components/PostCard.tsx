// app/components/PostCard.js (Server Component)

import styles from "@/styles/postCard.module.css";
import FollowButton from "./FollowButton";
import LikeButton from "./LikeButton";
import { Post } from "@/types";
import { useUserSession } from "@/hooks";

const PostCard = ({ post }: { post: Post }) => {
	const { userId } = useUserSession();
	return (
		<div className={styles.card}>
			{userId !== post.authorId && (
				<div className={styles.postHeader}>
					<h3 className={styles.authorName}>
						{post.author?.username}
					</h3>
					<FollowButton authorId={post.authorId} />
				</div>
			)}

			<h2 className={styles.title}>{post.title}</h2>
			<p className={styles.description}>{post.content}</p>
			<div className={styles.actions}>
				<LikeButton postId={post.id} initialLikes={post.likes} />
			</div>
		</div>
	);
};

export default PostCard;
