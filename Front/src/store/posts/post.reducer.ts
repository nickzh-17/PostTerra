import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "types/post";
import { Genre, Tab } from "types/tabs";
import {
	createPostThunk,
	dislikePostThunk,
	getGenresThunk,
	getPostsThunk,
	getPostThunk,
	likePostThunk,
} from "./post.actions";

interface PostState {
	isPostsLoading: boolean;
	posts: Post[];
	postsCount: number;

	tabValue: Tab["value"];

	genres: Tab[];
	genreValue: Tab["value"] | null;

	isPostLoading: boolean;
	post: Post | null;

	postsPerPage: number;
	currentPage: number;
}

const initialState: PostState = {
	isPostsLoading: false,
	posts: [],
	postsCount: 0,

	isPostLoading: false,
	post: null,
	tabValue: "all",

	genres: [],
	genreValue: null,

	postsPerPage: 10,
	currentPage: 1,
};

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		setIsPostsLoading: (state, action: PayloadAction<boolean>) => {
			state.isPostsLoading = action.payload;
		},

		setTab: (state, action: PayloadAction<Tab["value"]>) => {
			state.tabValue = action.payload;
			state.genreValue = null;
			state.currentPage = 1;
		},

		setGenre: (state, action: PayloadAction<Genre["value"]>) => {
			state.genreValue = action.payload;
		},

		setPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},

		setIsPostLoading: (state, action: PayloadAction<boolean>) => {
			state.isPostLoading = action.payload;
		},

		resetPosts: state => {
			state.posts = [];
			state.currentPage = 1;
			state.postsCount = 0;
			state.tabValue = "all";
			state.genreValue = null;
		},

		resetPost: state => {
			state.post = null;
		},

		resetGenre: state => {
			state.genreValue = null;
		},
	},

	extraReducers: builder => {
		builder
			.addCase(getPostsThunk.pending, state => {
				state.isPostsLoading = true;
			})

			.addCase(getPostsThunk.fulfilled, (state, action) => {
				state.posts = action.payload.posts;
				state.postsCount = action.payload.count;
				state.isPostsLoading = false;
			})

			.addCase(getPostThunk.pending, state => {
				state.isPostLoading = true;
			})

			.addCase(getPostThunk.fulfilled, (state, action) => {
				state.post = action.payload;
				state.isPostLoading = false;
			})

			.addCase(likePostThunk.fulfilled, (state, action) => {
				const postToUpdate = state.posts.find(post => post.id === action.payload?.id);
				if (!postToUpdate) return;
				Object.assign(postToUpdate, action.payload);
			})

			.addCase(dislikePostThunk.fulfilled, (state, action) => {
				const postToUpdate = state.posts.find(post => post.id === action.payload?.id);
				if (!postToUpdate) return;
				Object.assign(postToUpdate, action.payload);
			})

			.addCase(getGenresThunk.fulfilled, (state, action) => {
				state.genres = action.payload.genres;
			})

			.addCase(createPostThunk.fulfilled, (state, action) => {
				state.post = action.payload;
			});
	},
});

export const { setIsPostsLoading, setPage, setIsPostLoading, resetPosts, resetPost, setTab, setGenre, resetGenre } =
	postsSlice.actions;

export default postsSlice.reducer;
