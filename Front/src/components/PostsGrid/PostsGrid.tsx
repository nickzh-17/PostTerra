import clsx from "clsx";
import PostCard from "components/PostCard/PostCard";
import React from "react";

import { Post } from "types/post";

import styles from "./PostsGrid.module.css";

interface PostsGridProps {
	posts: Post[];
}

export const PostsGrid: React.FC<PostsGridProps> = ({ posts }) => {
	return (
		<div className={clsx(styles.postsGrid, { [styles.lessRow]: posts.length < 3 })}>
			{posts.map(post => (
				<PostCard post={post} key={post.id} />
			))}
		</div>
	);
};
