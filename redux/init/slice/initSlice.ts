import {PayloadAction, createSlice} from "@reduxjs/toolkit";

import Filter from "@/models/filter";
import {InitState} from "./initSlice.types";
import User from "../../../models/user";

const initialState: InitState = {
	isLoggedIn: false,

	isInitError: null,
	isInitLoading: false,

	user: null,
	token: null,
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

		loginSuccess: (state: InitState, action: PayloadAction<string>) => {
			state.isLoggedIn = true;
			state.token = action.payload;
		},

		logoutSuccess: (state: InitState) => {
			state.isLoggedIn = false;
			state.token = null;
		},

		initReset: (state: InitState) => {
			state.isLoggedIn = false;

			state.isInitError = null;
			state.isInitLoading = false;

			state.user = null;
			state.token = null;
			state.filter = null;
		},
	},
});

export const {initRequest, initFailure, initSuccess, loginSuccess, logoutSuccess, initReset} = initSlice.actions;

export default initSlice.reducer;
