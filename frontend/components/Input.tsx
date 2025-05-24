"use client";

import React from "react";
import styles from "@/styles/input.module.css";

interface InputProps {
	label: string;
	id: string;
	type: "text" | "textarea";
	value: string;
	onChange: (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => void;
	maxLength: number;
}

const Input: React.FC<InputProps> = ({
	label,
	id,
	type,
	value,
	onChange,
	maxLength,
}) => {
	const inputElement =
		type === "textarea" ? (
			<textarea
				id={id}
				value={value}
				onChange={onChange}
				maxLength={maxLength}
				className={styles.textarea}
				placeholder={
					label === "Title"
						? "Enter a title for your post"
						: "What's on your mind?"
				}
				rows={label === "Content" ? 6 : 1}
			/>
		) : (
			<input
				type="text"
				id={id}
				value={value}
				onChange={onChange}
				maxLength={maxLength}
				className={styles.input}
				placeholder={
					label === "Title" ? "Enter a title for your post" : ""
				}
			/>
		);

	return (
		<div className={styles.field}>
			<label htmlFor={id} className={styles.label}>
				{label}
			</label>
			{inputElement}
			<p className={styles.charCount}>
				{value.length}/{maxLength} characters
			</p>
		</div>
	);
};

export default Input;
