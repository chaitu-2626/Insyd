"use client";

import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";
import styles from "@/styles/createPost.module.css";
import Input from "@/components/Input";
import { useCreatePost } from "@/hooks";

const titleMaxLength = 100;
const contentMaxLength = 300;

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const { isSubmitting, handlePost } = useCreatePost({
		onSuccess: () => {
			toast.success("Your post has been created!");
			setTitle("");
			setContent("");
		},
		onError: (errorMessage: string) => {
			toast.error(errorMessage || "Failed to create post.");
		},
	});

	const handleSharePost = useCallback(() => {
		handlePost(title, content);
	}, [title, content, handlePost]);

	return (
		<div className={styles.page}>
			<div className={styles.wrapper}>
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<h1 className={styles.title}>Create New Post</h1>
						<p className={styles.subtitle}>
							Share your thoughts with the community
						</p>
					</div>

					<div className={styles.cardContent}>
						<Input
							label="Title"
							id="title"
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							maxLength={titleMaxLength}
						/>

						<Input
							label="Content"
							id="content"
							type="textarea"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							maxLength={contentMaxLength}
						/>
					</div>

					<div className={styles.cardFooter}>
						<button
							onClick={handleSharePost}
							disabled={
								isSubmitting || !title.trim() || !content.trim()
							}
							className={styles.button}
						>
							{isSubmitting ? "Posting..." : "Share Post"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePost;
