import {DropdownItem} from "@/helpers/types";

export type CreateAdForm = {
	apartment_type: string;
	bedrooms: number;
	toilets: number;
	bathrooms: number;
	rent_cost: number;
	payment_frequency: string;
	split_payment: number;
	preferred_gender: string;
	house_rules: string[];
	interests: string[];
	other_features: string[];
	apartment_images: string[];
	description: string;
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
