import { CreatePostForm } from "components/CreatePostForm/CreatePostForm";
import Typography from "components/UI/Typography/Typography";
import React from "react";

import styles from "./CreatePage.module.css";

export const CreatePage: React.FC = () => {
	return (
		<div className={styles.createPostContent}>
			<Typography color="second" variant="h1">
				New post
			</Typography>
			<CreatePostForm />
		</div>
	);
};
