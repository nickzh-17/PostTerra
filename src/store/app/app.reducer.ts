import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "types/unions";

interface AppState {
	theme: Theme;
}

const initialState: AppState = {
	theme: "light",
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		toggleTheme: (state, action: PayloadAction<boolean>) => {
			state.theme = state.theme === "light" ? "dark" : "light";
		},
	},
});

export const { toggleTheme } = appSlice.actions;

export default appSlice.reducer;
