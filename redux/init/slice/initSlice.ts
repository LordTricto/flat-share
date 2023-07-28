import {PayloadAction, createSlice} from "@reduxjs/toolkit";

import Filter from "@/models/filter";
import {InitState} from "./initSlice.types";
import User from "../../../models/user";

const initialState: InitState = {
	isLoggedIn: false,

	isInitError: null,
	isInitLoading: false,

	isAccountCreated: false,
	user: null,
	filter: null,
};

export const initSlice = createSlice({
	name: "init",
	initialState,
	reducers: {
		initRequest: (state: InitState) => {
			state.isInitError = null;
			state.isInitLoading = true;
		},

		initFailure: (state: InitState, action: PayloadAction<string>) => {
			state.isInitError = action.payload;
			state.isInitLoading = true;
		},

		initSuccess: (state: InitState, action: PayloadAction<{user: User; filter: Filter}>) => {
			state.isLoggedIn = true;
			state.isInitError = null;
			state.isInitLoading = false;
			state.user = action.payload.user;
			state.filter = action.payload.filter;
		},
		initLoadingFalse: (state: InitState) => {
			state.isInitLoading = true;
		},

		loginSuccess: (state: InitState) => {
			state.isLoggedIn = true;
		},

		logoutSuccess: (state: InitState) => {
			state.isLoggedIn = false;
			state.isInitError = null;
			// state.user = null;
			state.filter = null;
		},

		setIsAccountCreatedStatus: (state: InitState, action: PayloadAction<boolean>) => {
			state.isAccountCreated = action.payload;
		},

		setUpdatedUserProfile: (state: InitState, action: PayloadAction<string>) => {
			if (state.user) {
				state.user.profile_photo_path = action.payload;
			}
		},

		initReset: (state: InitState) => {
			state.isLoggedIn = false;

			state.isInitError = null;
			state.isInitLoading = false;

			state.user = null;
			state.filter = null;
		},
	},
});

export const {
	initRequest,
	initFailure,
	initSuccess,
	initLoadingFalse,
	loginSuccess,
	logoutSuccess,
	setIsAccountCreatedStatus,
	setUpdatedUserProfile,
	initReset,
} = initSlice.actions;

export default initSlice.reducer;
