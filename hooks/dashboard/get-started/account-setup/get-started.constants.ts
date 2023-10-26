import {UserReligion, UserSex, UserType} from "@/models/user.constant";

import {DropdownItem} from "@/helpers/types";
import Filter from "@/models/filter";
import User from "@/models/user";

export enum GetStartedStage {
	STAGE_ONE = 1,
	STAGE_TWO = 2,
	STAGE_THREE = 3,
	STAGE_FOUR = 4,
}

export type AccountTypeForm = {
	user_type: UserType | null;
};

export type UploadProfileImageForm = {
	profile_photo: string;
};

export type PersonalInformationForm = {
	age: string;
	bio: string;
	sex: UserSex | null;
	religion: UserReligion | null;
	education: string;
	profession: string;
};

export type AccountPreferenceForm = {
	budget: number;
	location_1: string;
	location_2: string;
};

export interface PersonalInformationFormResponse {
	success: string;
	message: string;
}

export const religionOptions: DropdownItem<string>[] = [
	{
		text: "Christianity",
		value: UserReligion.CHRISTIANITY,
	},
	{
		text: "Islam",
		value: UserReligion.ISLAM,
	},
	{
		text: "Atheism",
		value: UserReligion.OTHERS,
	},
];
export const educationOptions: DropdownItem<string>[] = [
	{
		text: "Undergraduate",
		value: "undergraduate",
	},
	{
		text: "Graduated",
		value: "graduated",
	},
	{
		text: "Postgraduate",
		value: "postgraduate",
	},
	{
		text: "Trade School",
		value: "trade_school",
	},
	{
		text: "None",
		value: "none",
	},
];

export const ageOptions: DropdownItem<string>[] = Array.from(new Array(50), (_, index) => ({
	text: `${index + 18}`,
	value: `${index + 18}`,
}));

export const genderOptions: DropdownItem<string>[] = [
	{
		text: "Male",
		value: "male",
	},
	{
		text: "Female",
		value: "female",
	},
];

export const locationOptions: DropdownItem<string>[] = [
	{
		text: "Gbagada, Lagos",
		value: "Gbagada, Lagos",
	},
	{
		text: "Gbadegesin, Lagos",
		value: "Gbadegesin, Lagos",
	},
	{
		text: "Gbadebo , Lagos",
		value: "Gbadebo , Lagos",
	},
];

export type GetStartedForm = AccountTypeForm & UploadProfileImageForm;
export interface GetStartedFormResponse {
	success: string;
	message: string;
	user: User;
	filter: Filter;
	reset_filter_to_default: Filter;
}
