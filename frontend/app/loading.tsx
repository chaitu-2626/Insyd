import React from "react";
import styles from "@/styles/loadingCards.module.css";

const Loading = () => {
	return (
		<div className={styles.loadingContainer}>
			<div className={styles.car}>
				<span className={styles.body}>
					<span className={styles.front}></span>
					<span className={styles.back}></span>
				</span>
				<span className={styles.wheel}></span>
				<span className={styles.wheel}></span>
			</div>
			<div className={styles.car}>
				<span className={styles.body}>
					<span className={styles.front}></span>
					<span className={styles.back}></span>
				</span>
				<span className={styles.wheel}></span>
				<span className={styles.wheel}></span>
			</div>
			<div className={styles.car}>
				<span className={styles.body}>
					<span className={styles.front}></span>
					<span className={styles.back}></span>
				</span>
				<span className={styles.wheel}></span>
				<span className={styles.wheel}></span>
			</div>
		</div>
	);
};

export default Loading;
