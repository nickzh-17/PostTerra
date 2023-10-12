import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Log } from "types/app";
import { Theme } from "types/unions";

interface AppState {
	theme: Theme;
	log: Log;
}

const initialState: AppState = {
	theme: "light",
	log: {
		type: "",
		event: "",
		message: "",
	},
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		toggleTheme: state => {
			const newTheme = state.theme === "light" ? "dark" : "light";
			document.body.dataset.theme = newTheme;
			state.theme = newTheme;
		},

		openPopup: (state, action: PayloadAction<Log>) => {
			state.log = action.payload;
		},

		closePopup: state => {
			state.log = initialState.log;
		},
	},
});

export const { toggleTheme, openPopup, closePopup } = appSlice.actions;

export default appSlice.reducer;
