import {UserReligion, UserSex, UserType} from "@/models/user.constant";

import {DropdownItem} from "@/helpers/types";
import Filter from "@/models/filter";
import User from "@/models/user";

export enum SettingsSection {
	PERSONAL_DETAILS = "personal-details",
	PREFERENCE = "preference",
	INTERESTS = "interests",
	ACCOUNT = "account",
	NOTIFICATIONS = "notifications",
}

export const SettingsSections: SettingsSection[] = [
	SettingsSection.PERSONAL_DETAILS,
	SettingsSection.PREFERENCE,
	SettingsSection.INTERESTS,
	SettingsSection.ACCOUNT,
	SettingsSection.NOTIFICATIONS,
];

export const SettingsSectionsText = {
	[SettingsSection.ACCOUNT]: "Account",
	[SettingsSection.INTERESTS]: "Interests",
	[SettingsSection.NOTIFICATIONS]: "Notifications",
	[SettingsSection.PERSONAL_DETAILS]: "Personal Details",
	[SettingsSection.PREFERENCE]: "Preference",
};

export enum SportInterest {
	ATHLETICS = "athletics",
	BASKETBALL = "basketball",
	BOWLING = "bowling",
	BOXING = "boxing",
	FOOTBALL = "football",
	GOLF = "golf",
	HANDBALL = "handball",
	LAWN_TENNIS = "lawn tennis",
	RACING = "racing",
	ROLLER_SKATING = "roller skating",
	SWIMMING = "swimming",
	TABLE_TENNIS = "table tennis",
	VOLLEYBALL = "volleyball",
}

export const SportsInterests: SportInterest[] = [
	SportInterest.ATHLETICS,
	SportInterest.BASKETBALL,
	SportInterest.BOWLING,
	SportInterest.BOXING,
	SportInterest.FOOTBALL,
	SportInterest.GOLF,
	SportInterest.HANDBALL,
	SportInterest.LAWN_TENNIS,
	SportInterest.RACING,
	SportInterest.ROLLER_SKATING,
	SportInterest.SWIMMING,
	SportInterest.TABLE_TENNIS,
	SportInterest.VOLLEYBALL,
];

export enum FoodInterest {
	BAKING = "baking",
	BEER = "beer",
	COOKING = "cooking",
	COFFEE = "coffee",
	COCKTAIL = "cocktail",
	FOODIE = "foodie",
	PIZZA = "pizza",
	SWEET_TOOTH = "sweet tooth",
	TEA = "tea",
	VEGAN = "vegan",
	VEGETARIAN = "vegetarian",
	VODKA = "vodka",
	WHISKY = "whisky",
	WINE = "wine",
}
export const FoodInterests: FoodInterest[] = [
	FoodInterest.BAKING,
	FoodInterest.BEER,
	FoodInterest.COOKING,
	FoodInterest.COFFEE,
	FoodInterest.COCKTAIL,
	FoodInterest.FOODIE,
	FoodInterest.PIZZA,
	FoodInterest.SWEET_TOOTH,
	FoodInterest.TEA,
	FoodInterest.VEGAN,
	FoodInterest.VEGETARIAN,
	FoodInterest.VODKA,
	FoodInterest.WHISKY,
	FoodInterest.WINE,
];

export enum MusicInterest {
	AFROBEAT = "afrobeat",
	AMAPIANO = "amapiano",
	BLUES = "blues",
	CLASSICAL = "classical",
	COUNTRY_ACOUSTIC = "country & acoustic",
	DRILL_GRIME = "drill & grime",
	ELECTRONIC = "electronic",
	GOSPEL = "gospel",
	HIP_HOP = "hip hop",
	INDIE_FOLK = "indie & folk",
	K_POP = "K-Pop",
	POP = "pop",
	ROCK = "rock",
	R_B = "R&B",
	REGGAE = "reggae",
	SOUL = "soul",
	TRAP = "trap",
}
export const MusicInterests: MusicInterest[] = [
	MusicInterest.AFROBEAT,
	MusicInterest.AMAPIANO,
	MusicInterest.BLUES,
	MusicInterest.CLASSICAL,
	MusicInterest.COUNTRY_ACOUSTIC,
	MusicInterest.DRILL_GRIME,
	MusicInterest.ELECTRONIC,
	MusicInterest.GOSPEL,
	MusicInterest.HIP_HOP,
	MusicInterest.INDIE_FOLK,
	MusicInterest.K_POP,
	MusicInterest.POP,
	MusicInterest.ROCK,
	MusicInterest.R_B,
	MusicInterest.REGGAE,
	MusicInterest.SOUL,
	MusicInterest.TRAP,
];

export enum FilmInterest {
	ANIME = "anime",
	ANIMATIONS = "animations",
	ACTION_ADVENTURE = "action & adventure",
	CARTOON = "cartoon",
	COMEDY = "comedy",
	BOLLYWOOD = "bollywood",
	DRAMA = "drama",
	DOCUMENTARY = "documentary",
	HORROR = "horror",
	K_DRAMA = "K-Drama",
	NOLLYWOOD = "nollywood",
	REALITY_SHOWS = "reality shows",
	ROMANCE = "romance",
	SCI_FI = "Sci-Fi",
	THRILLER = "thriller",
	TV_SERIES = "TV Series",
}
export const FilmInterests: FilmInterest[] = [
	FilmInterest.ANIME,
	FilmInterest.ANIMATIONS,
	FilmInterest.ACTION_ADVENTURE,
	FilmInterest.CARTOON,
	FilmInterest.COMEDY,
	FilmInterest.BOLLYWOOD,
	FilmInterest.DRAMA,
	FilmInterest.DOCUMENTARY,
	FilmInterest.HORROR,
	FilmInterest.K_DRAMA,
	FilmInterest.NOLLYWOOD,
	FilmInterest.REALITY_SHOWS,
	FilmInterest.ROMANCE,
	FilmInterest.SCI_FI,
	FilmInterest.THRILLER,
	FilmInterest.TV_SERIES,
];

export enum OtherInterest {
	ALTE = "alte",
	BOARD_GAMES = "board game",
	BUSINESS = "business",
	CATS = "cats",
	CODING_PROGRAMMING = "coding & programming",
	DIY_CRAFT = "DIY Craft",
	DOGS = "dogs",
	FASHION_STYLE = "fashion & style",
	FEMINIST = "feminist",
	GYM = "gym",
	GEN_Z = "Gen-Z",
	JOGGING = "jogging",
	KARAOKE = "karaoke",
	MEDITATION = "meditation",
	MILLENIAL = "millenial",
	NATURE_LOVER = "nature lover",
	PHOTOGRAPHY = "photography",
	POLITICS = "politics",
	READING = "reading",
	TECHIE = "techie",
	VIDEO_GAMES = "video game",
	WRITING_POETRY = "writing & poetry",
	YOGA = "yoga",
}
export const OtherInterests: OtherInterest[] = [
	OtherInterest.ALTE,
	OtherInterest.BOARD_GAMES,
	OtherInterest.BUSINESS,
	OtherInterest.CATS,
	OtherInterest.CODING_PROGRAMMING,
	OtherInterest.DIY_CRAFT,
	OtherInterest.DOGS,
	OtherInterest.FASHION_STYLE,
	OtherInterest.FEMINIST,
	OtherInterest.GYM,
	OtherInterest.GEN_Z,
	OtherInterest.JOGGING,
	OtherInterest.KARAOKE,
	OtherInterest.MEDITATION,
	OtherInterest.MILLENIAL,
	OtherInterest.NATURE_LOVER,
	OtherInterest.PHOTOGRAPHY,
	OtherInterest.POLITICS,
	OtherInterest.READING,
	OtherInterest.TECHIE,
	OtherInterest.VIDEO_GAMES,
	OtherInterest.WRITING_POETRY,
	OtherInterest.YOGA,
];

export type AccountTypeForm = {
	user_type: UserType | null;
};

export type PersonalDetailsForm = {
	fname: string;
	lname: string;
	phone: string;
	email: string;
};

export type OtherPersonalDetailsForm = {
	age: string;
	bio: string;
	sex: UserSex | null;
	religion: UserReligion | null;
	education: string;
	profession: string;
};

export type AccountPreferenceForm = {
	user_type: UserType | null;
	first_age_range: number;
	second_age_range: number;
	education: string;
	sex: string;
	profession: string;

	location_1: string;
	location_2: string;
	state: string;

	min_budget: string;
	max_budget: string;
};

export type InterestsForm = {
	sports: [];
	food: [];
	music: [];
	film: [];
	other: [];
};

export type AccountForm = {
	current_password: string;
	new_password: string;
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

export const userTypeOptions: DropdownItem<string>[] = [
	{
		text: "Host",
		value: UserType.HOST,
	},
	{
		text: "Flatmate",
		value: UserType.HOST_HUNTERS,
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

// export type GetStartedForm = AccountTypeForm & PersonalInformationForm & AccountPreferenceForm;
// export interface GetStartedFormResponse {
// 	success: string;
// 	message: string;
// 	user: User;
// 	filtered: Filter;
// }
