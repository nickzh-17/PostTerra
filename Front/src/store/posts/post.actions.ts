import { createAsyncThunk } from "@reduxjs/toolkit";
import GenreApi from "api/genre";
import PostApi from "api/post";
import { RootState } from "store";
import { Post } from "types/post";
import { getPostSlice } from "./post.selector";

export const getPostsThunk = createAsyncThunk("posts/getPostsThunk", async (param, thunkApi) => {
	const { getState } = thunkApi;

	const { postsPerPage, currentPage, tabValue, genreValue } = getPostSlice(getState() as RootState);
	const _offset = postsPerPage * (currentPage - 1);

	const response = await PostApi.getPosts({ limit: postsPerPage, offset: _offset, tabValue, genreValue });
	return response;
});

export const getPostThunk = createAsyncThunk("posts/getPostThunk", async (id: Post["id"], thunkApi) => {
	const response = await PostApi.getPost(id);
	return response;
});

export const likePostThunk = createAsyncThunk("posts/likePostThunk", async (postId: Post["id"]) => {
	const response = await PostApi.likePost(postId);
	return response;
});

export const dislikePostThunk = createAsyncThunk("posts/dislikePostThunk", async (postId: Post["id"]) => {
	const response = await PostApi.dislikePost(postId);
	return response;
});

export const getGenresThunk = createAsyncThunk("posts/getGenresThunk", async () => {
	const response = await GenreApi.getGenres();
	return response;
});

export const createPostThunk = createAsyncThunk("posts/addPostThunk", async (post: FormData) => {
	const response = await PostApi.createPost(post);
	return response;
});
