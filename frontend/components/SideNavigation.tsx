"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusSquare, User } from "lucide-react";
import styles from "@/styles/sideNavigation.module.css";

const SideNavigation: React.FC = () => {
	const pathname = usePathname();

	const navItems = [
		{ path: "/", icon: Home, label: "Home" },
		{ path: "/create", icon: PlusSquare, label: "Create" },
		{ path: "/profile", icon: User, label: "Profile" },
	];

	return (
		<div className={styles.sidebar}>
			<div className={styles.logoWrapper}>
				<h1 className={styles.logoText}>Insyd</h1>
			</div>
			<nav>
				<ul className={styles.navList}>
					{navItems.map(({ path, icon: Icon, label }) => {
						const isActive = pathname === path;
						return (
							<li key={path}>
								<Link
									href={path}
									className={`${styles.navLink} ${
										isActive ? styles.active : ""
									}`}
								>
									<Icon
										size={24}
										className={
											isActive
												? styles.iconActive
												: styles.icon
										}
									/>
									<span className={styles.label}>
										{label}
									</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
};

export default SideNavigation;
