import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthApi from "api/auth";
import PostApi from "api/post";
import { LoginParams, RegistrationParams } from "types/api-types/request";
import { Post } from "types/post";

export const registrationThunk = createAsyncThunk("user/registrationThunk", (values: RegistrationParams) =>
	AuthApi.registration(values)
);

export const loginThunk = createAsyncThunk("user/loginThunk", async (values: LoginParams, { rejectWithValue }) => {
	return await AuthApi.login(values);
});

export const logoutThunk = createAsyncThunk("user/logoutThunk", () => AuthApi.logout());

export const checkAuthThunk = createAsyncThunk("user/checkAuthThunk", () => AuthApi.checkAuth());

export const toggleUserFavoritePostThunk = createAsyncThunk(
	"posts/toggleUserFavoritePostThunk",
	async (postId: Post["id"]) => {
		const response = await PostApi.toggleUserFavoritePost(postId);
		return response;
	}
);

// export const getMeThunk = createAsyncThunk("user/getMeThunk", () => getMe());
