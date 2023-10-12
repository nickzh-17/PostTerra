import { createSlice } from "@reduxjs/toolkit";
import { Log } from "types/app";
import { UserDto } from "types/user";
import { isLoginSuccessful } from "utils/is-auth-successful";
import {
	checkAuthThunk,
	loginThunk,
	logoutThunk,
	registrationThunk,
	toggleUserFavoritePostThunk,
} from "./user.actions";

interface UserState {
	isAuth: boolean;
	user: UserDto | null;
	isUserLoading: boolean;
	isUserFetched: boolean;
	log: Log;
}

const initialState: UserState = {
	isAuth: false,
	user: null,
	isUserLoading: false,
	isUserFetched: false,
	log: {
		type: "",
		event: "",
		message: "",
	},
};

// export const loginThunk = createAsyncThunk("user/loginThunk", async (values: LoginParams, { rejectWithValue }) => {
// 	// return await AuthApi.login(values);
// 	try {
// 		const response = await fetch("http://localhost:6686/api/auth/login", {
// 			method: "POST",
// 			mode: "cors",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(values),
// 		});

// 		if (!response.ok) {
// 			throw new Error("Auth Error");
// 		}

// 		const data = await response.json();
// 		return data;
// 	} catch (error) {
// 		return rejectWithValue(error);
// 	}
// });

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(registrationThunk.pending, state => {
				state.isUserLoading = true;
			})
			.addCase(registrationThunk.fulfilled, (state, action) => {
				state.isUserLoading = false;
			})
			.addCase(loginThunk.pending, state => {
				state.isUserLoading = true;
				state.log.type = "default";
				state.log.message = "PEEEEEEEENDING";
			})
			.addCase(loginThunk.fulfilled, (state, action) => {
				state.isUserLoading = false;
				if (isLoginSuccessful(action.payload)) {
					localStorage.setItem("token", action.payload.accessToken);
					state.user = action.payload.user;
					state.isAuth = true;
					// state.log.type = "success";
					// state.log.message = action.payload.user.username;
				}
			})
			.addCase(loginThunk.rejected, (state, action) => {
				console.log(action);
			})
			.addCase(logoutThunk.pending, state => {
				state.isUserLoading = true;
			})
			.addCase(logoutThunk.fulfilled, (state, action) => {
				localStorage.removeItem("token");
				state.user = null;
				state.isAuth = false;
				state.isUserLoading = false;
			})
			.addCase(checkAuthThunk.pending, state => {
				state.isUserLoading = true;
			})
			.addCase(checkAuthThunk.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.isAuth = true;
				localStorage.setItem("token", action.payload.accessToken);
				state.isUserLoading = false;
				state.isUserFetched = true;
			})
			.addCase(checkAuthThunk.rejected, state => {
				state.isUserLoading = false;
			})
			.addCase(toggleUserFavoritePostThunk.fulfilled, (state, action) => {
				const newUser = action.payload;
				state.user = newUser;
			});
		// builder.addCase(getMeThunk.fulfilled, (state, action) => {
		// 	state.user = action.payload;
		// });
	},
});

export default userSlice.reducer;
