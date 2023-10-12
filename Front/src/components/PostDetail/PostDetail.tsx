import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import Typography from "components/UI/Typography/Typography";
import { AppDispatch } from "../../store";
import BreadCrumbs, { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";

import { getPostThunk } from "store/posts/post.actions";
import { resetPost } from "store/posts/post.reducer";
import { getPostSlice } from "store/posts/post.selector";
import styles from "./PostDetail.module.css";

const PostDetail: React.FC = () => {
	const { id: postId } = useParams();

	const { post, isPostLoading: loading, genres } = useSelector(getPostSlice);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (!postId) return;

		if (!post) dispatch(getPostThunk(postId));

		return () => {
			dispatch(resetPost());
		};
	}, [dispatch, postId]);

	const breadcrumbs: BreadCrumb[] = [
		{
			link: "/",
			label: "Главная",
		},
		{
			link: `/posts/${postId}`,
			label: `Пост ${postId}`,
		},
	];

	return (
		<div>
			<BreadCrumbs className={styles.postBreadCrumbs} breadcrumbs={breadcrumbs} />

			{loading && "Loading"}

			{post && (
				<>
					<Typography className={styles.title} variant="h2" color="second">
						{post.title}
					</Typography>

					<div className={styles.content}>
						<div className={styles.infoWrapper}>
							<Typography className={styles.info} variant="span">
								{post.createdByName}
							</Typography>
							<Typography className={styles.info} variant="span">
								{genres.find(genre => genre.value === post.genre)?.label}
							</Typography>
							<Typography className={styles.text} variant="p">
								{post.description}
							</Typography>
						</div>
						<img className={styles.img} src={post.imageUrl} alt={post.title} />
						<Typography className={styles.text} variant="p">
							{post.body}
						</Typography>
					</div>
				</>
			)}
		</div>
	);
};

export default PostDetail;
