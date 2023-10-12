import Typography from "components/UI/Typography/Typography";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Post } from "types/post";
import { getParsedDate } from "utils/parseDate";
import PostActions from "./PostActions/PostActions";

import styles from "./PostCard.module.css";

interface PostCardProps {
	post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
	const navigate = useNavigate();

	return (
		<div className={styles.wrapper}>
			<div className={styles.cardInfo}>
				<Link to={`/posts/${post.id}`}>
					<div className={styles.imgWrapper} onClick={() => navigate(`/posts/${post.id}`)}>
						<img className={styles.img} src={post.imageUrl} alt={post.title} />
					</div>
				</Link>
				<Typography className={styles.title} variant="h2">
					{post.title}
				</Typography>
				<Typography className={styles.author} variant="span" color="second">
					{post.createdByName}
				</Typography>
				<div className={styles.info}>
					<Typography variant="span">{getParsedDate(post.creationDate)}</Typography>
					<Typography variant="span" color="primary">
						{post.description}
					</Typography>
				</div>
			</div>

			<PostActions post={post} />
		</div>
	);
};

export default PostCard;
