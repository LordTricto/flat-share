import {DropdownItem} from "@/helpers/types";
import User from "@/models/user";
import {UserSex} from "@/models/user.constant";

export enum CreateAdStage {
	STAGE_ONE = 1,
	STAGE_TWO = 2,
}

export type CreateAdApartmentForm = {
	apartment_type: string;
	rooms_no: number;
	bathrooms_no: number;
	toilets_no: number;
	house_state: string;
	house_city: string;
	house_street_address: string;
	description: string;
	apartment_images: string[];
	rent_cost: number;
	payment_frequency: string;
	rent_contribution: number;
	monthly_rent_charge: string;

	house_rules: string[];
	features: string[];
};

export type CreateAdPersonnelForm = {
	rent_cost: number;
	payment_frequency: string;
	rent_contribution: number;
	monthly_rent_charge: string;

	preferred_gender: UserSex;
	preferred_age: string;
	preferred_profession: string;
	preferred_religion: string;
	preferred_education: string;
};

//ponder on if needed
// interests: string[];

export type CreateAdForm = {
	apartment_type: string;
	rooms_no: number;
	bathrooms_no: number;
	toilets_no: number;
	rent_cost: number;
	payment_frequency: string;
	rent_contribution: number;
	monthly_rent_charge: string;
	house_rules: string[];
	features: string[];
	interests: string[];
	house_state: string;
	house_city: string;
	house_street_address: string;
	description: string;
};

export type CreateAdFormResponse = {
	status: string;
	message: string;
	data: User;
};
export type CreateAdImagesForm = {
	apartment_images: string[];
	description: string;
};
export type CreateAdImagesFormResponse = {
	status: string;
	message: string;
	data: {
		property_image_thumb_url: string;
		property_image_url: string;
	};
};

export const apartmentTypeOptions: DropdownItem<string>[] = [
	{
		text: "Self Contain",
		value: "self contain",
	},
	{
		text: "Room and parlor",
		value: "room and parlor",
	},
	{
		text: "Two bed room and parlor",
		value: "two bed room and parlor",
	},
	{
		text: "Three bed room and parlor",
		value: "three bed room and parlor",
	},
];

export const paymentFrequencyOptions: DropdownItem<string>[] = [
	{
		text: "Annually",
		value: "annually",
	},
	{
		text: "Monthly",
		value: "monthly",
	},
];

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
