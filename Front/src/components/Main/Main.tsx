import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Typography from "components/UI/Typography/Typography";

import { PostsGrid } from "components/PostsGrid/PostsGrid";
import { tabs } from "data/tabs";
import { Genre, Tab } from "types/tabs";
import styles from "./Main.module.css";

import { Pagination } from "components/Pagination/Pagination";
import Tabs from "components/Tabs/Tabs";
import { AppDispatch } from "store";
import { getGenresThunk, getPostsThunk } from "store/posts/post.actions";
import { resetGenre, resetPosts, setGenre, setPage, setTab } from "store/posts/post.reducer";
import { getPostSlice } from "store/posts/post.selector";
import { getUserSlice } from "store/user/user.selectors";

const Main: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { posts, postsCount, currentPage, postsPerPage, tabValue, genreValue, genres } = useSelector(getPostSlice);
	const { user } = useSelector(getUserSlice);

	const handleChangeTab = (newTab: Tab) => {
		dispatch(setTab(newTab.value));
	};
	const handleChangeSubtab = (newGenre: Genre) => {
		if (newGenre.value === genreValue) {
			dispatch(resetGenre());
			return;
		}

		dispatch(setGenre(newGenre.value));
	};

	const handleChangePage = (newPage: number) => {
		dispatch(setPage(newPage));
	};

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		dispatch(getPostsThunk());
		dispatch(getGenresThunk());
	}, [postsPerPage, currentPage, tabValue, genreValue, user]);

	useEffect(() => {
		return () => {
			dispatch(resetPosts());
		};
	}, []);

	return (
		<>
			<Typography color="second" className={styles.title} variant="h1">
				Blog
			</Typography>

			<div className={styles.postsTabs}>
				<Tabs tabs={tabs} activeTab={tabValue} onTabClick={handleChangeTab} />

				{!!genres.length && <Tabs tabs={genres} activeTab={genreValue} onTabClick={handleChangeSubtab} />}
			</div>

			{posts && <PostsGrid posts={posts} />}

			{postsCount >= postsPerPage && (
				<Pagination
					currentPage={currentPage}
					postsPerPage={postsPerPage}
					totalRecords={postsCount}
					onChangePage={handleChangePage}
				/>
			)}
		</>
	);
};

export default Main;
