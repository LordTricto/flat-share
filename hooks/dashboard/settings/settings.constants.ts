import {UserReligion, UserSex, UserType} from "@/models/user.constant";

import {DropdownItem} from "@/helpers/types";

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
	// SettingsSection.NOTIFICATIONS,
];

export const SettingsSectionsText = {
	[SettingsSection.ACCOUNT]: "Account",
	[SettingsSection.INTERESTS]: "Interests",
	[SettingsSection.NOTIFICATIONS]: "Notifications",
	[SettingsSection.PERSONAL_DETAILS]: "Personal Details",
	[SettingsSection.PREFERENCE]: "Preference",
};

export enum SportInterest {
	ATHLETICS = "Athletics",
	BASKETBALL = "Basketball",
	BOWLING = "Bowling",
	BOXING = "Boxing",
	FOOTBALL = "Football",
	GOLF = "Golf",
	HANDBALL = "Handball",
	LAWN_TENNIS = "Lawn Tennis",
	RACING = "Racing",
	ROLLER_SKATING = "Roller Skating",
	SWIMMING = "Swimming",
	TABLE_TENNIS = "Table Tennis",
	VOLLEYBALL = "Volleyball",
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
	BAKING = "Baking",
	BEER = "Beer",
	COOKING = "Cooking",
	COFFEE = "Coffee",
	COCKTAIL = "Cocktail",
	FOODIE = "Foodie",
	PIZZA = "Pizza",
	SWEET_TOOTH = "Sweet Tooth",
	TEA = "Tea",
	VEGAN = "Vegan",
	VEGETARIAN = "Vegetarian",
	VODKA = "Vodka",
	WHISKY = "Whisky",
	WINE = "Wine",
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
	AFROBEAT = "Afrobeat",
	AMAPIANO = "Amapiano",
	BLUES = "Blues",
	CLASSICAL = "Classical",
	COUNTRY_ACOUSTIC = "Country & Acoustic",
	DRILL_GRIME = "Drill & Grime",
	ELECTRONIC = "Electronic",
	GOSPEL = "Gospel",
	HIP_HOP = "Hip Hop",
	INDIE_FOLK = "Indie & Folk",
	K_POP = "K-Pop",
	POP = "Pop",
	ROCK = "Rock",
	R_B = "R&B",
	REGGAE = "Reggae",
	SOUL = "Soul",
	TRAP = "Trap",
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
	ANIME = "Anime",
	ANIMATIONS = "Animations",
	ACTION_ADVENTURE = "Action & Adventure",
	CARTOON = "Cartoon",
	COMEDY = "Comedy",
	BOLLYWOOD = "Bollywood",
	DRAMA = "Drama",
	DOCUMENTARY = "Documentary",
	HORROR = "Horror",
	K_DRAMA = "K-Drama",
	NOLLYWOOD = "Nollywood",
	REALITY_SHOWS = "Reality Shows",
	ROMANCE = "Romance",
	SCI_FI = "Sci-Fi",
	THRILLER = "Thriller",
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
	ALTE = "Alte",
	BOARD_GAMES = "Board Game",
	BUSINESS = "Business",
	CATS = "Cats",
	CODING_PROGRAMMING = "Coding & Programming",
	DIY_CRAFT = "DIY Craft",
	DOGS = "Dogs",
	FASHION_STYLE = "Fashion & Style",
	FEMINIST = "Feminist",
	GYM = "Gym",
	GEN_Z = "Gen-Z",
	JOGGING = "Jogging",
	KARAOKE = "Karaoke",
	MEDITATION = "Meditation",
	MILLENIAL = "Millenial",
	NATURE_LOVER = "Nature Lover",
	PHOTOGRAPHY = "Photography",
	POLITICS = "Politics",
	READING = "Reading",
	TECHIE = "Techie",
	VIDEO_GAMES = "Video Game",
	WRITING_POETRY = "Writing & Poetry",
	YOGA = "Yoga",
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
	fname?: string;
	lname?: string;
	phone?: string;
	email?: string;
};

export type OtherPersonalDetailsForm = {
	age?: string;
	bio?: string;
	sex?: UserSex | null;
	religion?: UserReligion | null;
	education?: string;
	profession?: string;
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
