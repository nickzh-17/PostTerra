import React from "react";

import styles from "./MainLayout.module.css";

interface MainLayoutProps {
	header: React.ReactNode;
	main: React.ReactNode;
	footer: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ header, main, footer }) => {
	// const { isPostsLoading, isPostLoading } = useSelector(getPostSlice);

	return (
		<>
			<section className={styles.app}>
				<header className={styles.header}>{header}</header>
				<div className={styles.wrapper}>
					<main className={styles.main}>{main}</main>
				</div>
				<footer className={styles.footer}>{footer}</footer>
			</section>

			{/* {(isPostsLoading || isPostLoading) && <Loader />} */}
		</>
	);
};

export default MainLayout;
