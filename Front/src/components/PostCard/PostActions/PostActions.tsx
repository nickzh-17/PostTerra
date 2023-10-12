import Icon from "components/Icon/Icon";
import Button from "components/UI/Button/Button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dislikePostThunk, likePostThunk } from "store/posts/post.actions";
import { Post } from "types/post";

import { AppDispatch } from "store";
import { toggleUserFavoritePostThunk } from "store/user/user.actions";
import { getUserSlice } from "store/user/user.selectors";
import styles from "./PostActions.module.css";
// import Icon from "../../Icon/Icon";

interface PostActionsProps {
	post: Post;
}

const PostActions: React.FC<PostActionsProps> = ({ post }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector(getUserSlice);

	const handleLikeClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		console.log(post);
		dispatch(likePostThunk(post.id));
	};
	const handleDislikeClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		dispatch(dislikePostThunk(post.id));
	};
	const handleFavoriteClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		dispatch(toggleUserFavoritePostThunk(post.id));
	};
	const handleMoreClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<div className={styles.actions}>
			<div className={styles.buttonsWrap}>
				<Button className={styles.buttonWithNumber} variant="icon" onClick={handleLikeClick}>
					<Icon type={post.isLikedByUser ? "likeUsed" : "likeUnused"} />
					{post.likes > 0 && <span style={{ marginLeft: 12 }}>{post.likes}</span>}
				</Button>
				<Button className={styles.buttonWithNumber} variant="icon" onClick={handleDislikeClick}>
					<Icon type={post.isDislikedByUser ? "dislikeUsed" : "dislikeUnused"} />
					{post.dislikes > 0 && <span style={{ marginLeft: 12 }}>{post.dislikes}</span>}
				</Button>
			</div>
			<div className={styles.buttonsWrap}>
				<Button variant="icon" onClick={handleFavoriteClick}>
					<Icon type={user?.favoritePosts.includes(post.id) ? "bookmarkUsed" : "bookmarkUnused"} />
				</Button>
				<Button variant="icon" onClick={handleMoreClick}>
					<Icon type="more" />
				</Button>
			</div>
		</div>
	);
};

export default PostActions;
