"use client";

import styles from "@/styles/error.module.css";

interface ErrorProps {
	error: Error | null;
	reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
	return (
		<div className={styles.errorContainer}>
			<h1 className={styles.errorTitle}>Oops! Something went wrong</h1>
			<p className={styles.errorMessage}>
				We encountered an unexpected issue while trying to load this
				page.
			</p>
			{error && error.message && (
				<details className={styles.errorDetails}>
					<summary>More details</summary>
					<p>{error.message}</p>
				</details>
			)}
			<button className={styles.reloadButton} onClick={() => reset()}>
				Try reloading the data
			</button>
		</div>
	);
};

export default Error;
