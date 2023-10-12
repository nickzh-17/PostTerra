import Button from "components/UI/Button/Button";
import TextAreaInput from "components/UI/TextAreaInput/TextAreaInput";
import TextInput from "components/UI/TextInput/TextInput";
import { useFormik } from "formik";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "store";
import { createPostThunk } from "store/posts/post.actions";
import { getPostSlice } from "store/posts/post.selector";
import { CreatePostParams as PostValues } from "types/api-types/request";
import * as yup from "yup";
import styles from "./CreatePostForm.module.css";

interface FormValues {
	title: string;
	description: string;
	body: string;
	creationDate: string;
	genre: string;
	image: File | null;
}

const initialValues: FormValues = {
	title: "",
	description: "",
	body: "",
	creationDate: "",
	image: null,
	genre: "",
};

const MAX_FILE_SIZE = 10485760;
const MAX_FILE_SIZE_TEXT = "10 mb";

const validationSchema = yup.object<PostValues>().shape({
	title: yup.string().required("required field").min(5, "too short").max(75, "too long"),
	description: yup.string().required("required field").min(5, "too short").max(100, "too long"),
	body: yup.string(),
	imageUrl: yup.string().url(),
	image: yup
		.mixed<File>()
		.required("required field")
		.test({
			name: "fileSize",
			exclusive: true,
			params: { MAX_FILE_SIZE_TEXT },
			message: `no more than ${MAX_FILE_SIZE_TEXT}`,
			test: (value: File) => value.size <= MAX_FILE_SIZE,
		}),
	creationDate: yup.string(),
	genre: yup.string(),
});

export const CreatePostForm: React.FC = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();
	const { isPostLoading } = useSelector(getPostSlice);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const { values, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
		initialValues: initialValues,
		validationSchema,
		onSubmit: data => {
			const creationDate = Date();
			data = { ...data, creationDate };

			console.log(data);

			const formData = new FormData();

			Object.entries(data).forEach(([key, value]) => {
				formData.append(key, value);
			});
			dispatch(createPostThunk(formData))
				.unwrap()
				.then(createdPost => {
					if (createdPost.id) navigate(`/posts/${createdPost.id}`);
				});
		},
	});

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<TextInput
				id="title"
				name="title"
				ref={inputRef}
				label="title"
				value={values.title}
				error={!!errors.title}
				description={!!errors.title ? errors.title : ""}
				type="text"
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<TextInput
				label="genre"
				id="genre"
				name="genre"
				value={values.genre}
				error={!!errors.genre}
				description={!!errors.genre ? errors.genre : ""}
				type="text"
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<TextInput
				id="image"
				name="image"
				label="image"
				accept="image/*"
				error={!!errors.image}
				description={!!errors.image ? errors.image : ""}
				type="file"
				onChange={e => {
					setFieldValue("image", e.target.files?.[0] ? e.target.files?.[0] : null);
				}}
				onBlur={handleBlur}
			/>
			<TextAreaInput
				label="description"
				id="description"
				name="description"
				value={values.description}
				error={!!errors.description}
				description={!!errors.description ? errors.description : ""}
				type="text"
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<TextAreaInput
				label="text"
				id="body"
				name="body"
				value={values.body}
				error={!!errors.body}
				description={!!errors.body ? errors.body : ""}
				type="text"
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<Button variant="clear" disabled={isPostLoading} type="submit" style={{ marginBottom: "20px" }}>
				Create post
			</Button>
		</form>
	);
};
