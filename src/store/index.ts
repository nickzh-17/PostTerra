import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app/app.reducer";

// import postsReducer from "./post/post.reducer";
// import userReduser from "./user/user.reduser";

export const store = configureStore({
	reducer: {
		app: appReducer,
		// posts: postsReducer,
		// user: userReduser,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
