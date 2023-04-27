import {DropdownItem} from "@/helpers/types";

export enum FindFlatmateStage {
	stageOne = 1,
	stageTwo = 2,
}

export const apartmentTypeOptions: DropdownItem<number>[] = [
	{
		text: "Self Contain",
		value: 1,
	},
	{
		text: "Room and parlor",
		value: 2,
	},
	{
		text: "Two bed room and parlor",
		value: 3,
	},
	{
		text: "Three bed room and parlor",
		value: 3,
	},
];

export const genderOptions: DropdownItem<number>[] = [
	{
		text: "Male",
		value: 1,
	},
	{
		text: "Female",
		value: 2,
	},
	{
		text: "None binary",
		value: 3,
	},
];

export const religionOptions: DropdownItem<number>[] = [
	{
		text: "Christian",
		value: 1,
	},
	{
		text: "Muslim",
		value: 2,
	},
	{
		text: "Traditional",
		value: 3,
	},
];
