import {AccountSignals, HostSignals, InitState, InterestsType} from "./initSlice.types";
import {PayloadAction, createSlice} from "@reduxjs/toolkit";

import Filter from "@/models/filter";
import User from "../../../models/user";
import UserReceivedRequest from "@/models/user-received-request";
import UserRequests from "@/models/user-requests";
import UserSentRequest from "@/models/user-sent-request";
import UserStatistics from "@/models/user-statistics";

const initialState: InitState = {
	isLoggedIn: false,
	isInitError: null,
	isInitLoading: false,
	isAccountCreated: false,
	isAccountSetup: false,
	hostFee: null,
	hostSignal: null,
	accountSignal: null,
	userStatistics: null,
	user: null,
	filter: null,
	requests: null,
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
		setHostInitSignal: (state: InitState, action: PayloadAction<{hostSignal: HostSignals | null}>) => {
			state.hostSignal = action.payload.hostSignal;
		},
		setHostFee: (state: InitState, action: PayloadAction<number>) => {
			state.hostFee = action.payload;
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

		setUserStatistics: (state: InitState, action: PayloadAction<UserStatistics>) => {
			state.userStatistics = action.payload;
		},
		setUserRequests: (
			state: InitState,
			action: PayloadAction<{
				sent_request: UserSentRequest;
				received_request: UserReceivedRequest;
			}>
		) => {
			state.requests = UserRequests.create({sent_request: action.payload.sent_request, received_request: action.payload.received_request});
		},
		setFilterUserRequestReceived: (state: InitState, action: PayloadAction<string>) => {
			if (state.requests) {
				state.requests.received_request.received_request_data =
					state.requests?.received_request.received_request_data.filter((_) => _.codec !== action.payload) || [];
				state.requests.received_request.received_request_no === state.requests.received_request.received_request_no - 1;
			}
		},
		setFilterUserRequestSent: (state: InitState, action: PayloadAction<string>) => {
			if (state.requests) {
				state.requests.sent_request.sent_request_data =
					state.requests?.sent_request.sent_request_data.filter((_) => _.codec !== action.payload) || [];
				state.requests.sent_request.sent_request_no === state.requests.sent_request.sent_request_no - 1;
			}
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
			state.hostFee = null;
			state.accountSignal = null;
			state.filter = null;
			state.userStatistics = null;
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

	setHostFee,
	loginSuccess,
	logoutSuccess,
	setInitSignals,
	setUserRequests,
	setUpdatedFilter,
	setUserStatistics,
	setHostInitSignal,
	setUpdatedInterests,
	setUpdatedUserProfile,
	setFilterUserRequestSent,
	setIsAccountCreatedStatus,
	setFilterUserRequestReceived,
	initReset,
} = initSlice.actions;

export default initSlice.reducer;
