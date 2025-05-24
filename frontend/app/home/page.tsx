import Posts from "@/components/Posts";
import styles from "./page.module.css";

const Page = () => {
	return (
		<div className={styles.homePage}>
			<Posts loggedInUserPostOnly={false} />
		</div>
	);
};

export default Page;
