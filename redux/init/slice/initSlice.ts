import {AccountSignals, HostSignals, InitState, InterestsType} from "./initSlice.types";
import {PayloadAction, createSlice} from "@reduxjs/toolkit";

import Filter from "@/models/filter";
import Parsers from "@/utils/parsers";
import User from "../../../models/user";

const initialState: InitState = {
	isLoggedIn: false,
	isInitError: null,
	isInitLoading: false,
	isAccountCreated: false,
	isAccountSetup: false,
	hostSignal: null,
	accountSignal: null,
	user: null,
	filter: null,
	interests: {
		food: [],
		music: [],
		others: [],
		sports: [],
		film_and_tv: [],
	},
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

		initSuccess: (state: InitState, action: PayloadAction<{user: User; filter: Filter | null; interests: InterestsType}>) => {
			state.isLoggedIn = true;
			state.isInitError = null;
			state.isInitLoading = false;
			state.user = action.payload.user;
			state.filter = action.payload.filter;
			state.interests = action.payload.interests;
		},

		setInitSignals: (state: InitState, action: PayloadAction<{accountSignal: AccountSignals | null; hostSignal: HostSignals | null}>) => {
			state.hostSignal = action.payload.hostSignal;
			state.accountSignal = action.payload.accountSignal;
			state.isAccountSetup =
				action.payload.accountSignal === null ? false : !!(action.payload.accountSignal !== AccountSignals.SETUP_UNCOMPLETED);
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
			state.filter = null;
			state.interests = {
				food: [],
				music: [],
				others: [],
				sports: [],
				film_and_tv: [],
			};
		},

		setIsAccountCreatedStatus: (state: InitState, action: PayloadAction<boolean>) => {
			state.isAccountCreated = action.payload;
		},

		setUpdatedUserProfile: (state: InitState, action: PayloadAction<string>) => {
			if (state.user) {
				state.user.profile_photo_path = action.payload;
			}
		},

		setUpdatedFilter: (state: InitState, action: PayloadAction<Filter>) => {
			state.filter = action.payload;
		},

		setUpdatedInterests: (state: InitState, action: PayloadAction<InterestsType>) => {
			state.interests = action.payload;
		},

		initReset: (state: InitState) => {
			state.isLoggedIn = false;
			state.isInitError = null;
			state.isInitLoading = false;
			state.user = null;
			state.hostSignal = null;
			state.accountSignal = null;
			state.filter = null;
			state.interests = {
				food: [],
				music: [],
				others: [],
				sports: [],
				film_and_tv: [],
			};
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
	setInitSignals,
	setIsAccountCreatedStatus,
	setUpdatedUserProfile,
	setUpdatedFilter,
	setUpdatedInterests,
	initReset,
} = initSlice.actions;

export default initSlice.reducer;
