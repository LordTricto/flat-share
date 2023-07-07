import {AccountPreferenceForm, GetStartedStage, PersonalInformationForm} from "@/hooks/dashboard/get-started/account-setup/get-started.constants";
import {PayloadAction, createSlice} from "@reduxjs/toolkit";

import {GetStartedState} from "./get-started.types";
import {UserType} from "@/models/user.constant";

const initialState: GetStartedState = {
	isHost: false,
	stage: GetStartedStage.STAGE_ONE,
	userData: {
		sex: null,
		age: "",
		bio: "",
		budget: 0,
		religion: null,
		user_type: null,
		education: "",
		location_1: "",
		location_2: "",
		profession: "",
	},
};

export const getStartedSlice = createSlice({
	name: "get-started",
	initialState,
	reducers: {
		setToStageOne: (state: GetStartedState) => {
			state.stage = GetStartedStage.STAGE_ONE;
		},
		setToStageTwo: (state: GetStartedState) => {
			state.stage = GetStartedStage.STAGE_TWO;
		},
		setToStageThree: (state: GetStartedState) => {
			state.stage = GetStartedStage.STAGE_THREE;
		},
		setToStageFour: (state: GetStartedState) => {
			state.stage = GetStartedStage.STAGE_FOUR;
		},

		setIsHostTrue: (state: GetStartedState) => {
			state.isHost = true;
			state.userData.user_type = UserType.HOST;
		},
		setIsHostFalse: (state: GetStartedState) => {
			state.isHost = false;
			state.userData.user_type = UserType.HOST_HUNTERS;
		},
		setPersonalInformation: (state: GetStartedState, action: PayloadAction<PersonalInformationForm>) => {
			state.userData.age = action.payload.age;
			state.userData.bio = action.payload.bio;
			state.userData.sex = action.payload.sex;
			state.userData.religion = action.payload.religion;
			state.userData.education = action.payload.education;
			state.userData.profession = action.payload.profession;
		},

		setAccountPreference: (state: GetStartedState, action: PayloadAction<AccountPreferenceForm>) => {
			state.userData.budget = action.payload.budget;
			state.userData.location_1 = action.payload.location_1;
			state.userData.location_2 = action.payload.location_2;
		},

		applicationReset: (state: GetStartedState) => {
			state.isHost = false;
			state.stage = GetStartedStage.STAGE_ONE;
			state.userData = {
				sex: null,
				age: "",
				bio: "",
				budget: 0,
				religion: null,
				user_type: null,
				education: "",
				location_1: "",
				profession: "",
				location_2: "",
			};
		},
	},
});

export const {
	setToStageOne,
	setToStageTwo,
	setToStageThree,
	setToStageFour,

	setIsHostTrue,
	setIsHostFalse,
	setPersonalInformation,
	setAccountPreference,
	applicationReset,
} = getStartedSlice.actions;

export default getStartedSlice.reducer;
