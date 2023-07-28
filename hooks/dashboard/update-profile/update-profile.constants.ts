import {UserReligion, UserSex} from "@/models/user.constant";

import Filter from "@/models/filter";
import User from "@/models/user";

export type UpdateProfileForm = {
	firstname: string;
	lastname: string;
	phone: string;
	email: string;
	profession: string;
	sex: UserSex | null;
	age: number;
	religion: UserReligion | null;
	bio: string;
	// budget: string;
	// location_1: string;
};

export type UpdateApartmentDetailsForm = {
	apartment_images: string[];
	description: string;
};

export interface UpdateProfileFormResponse {
	success: string;
	message: string;
}

export interface UpdateProfileFormResponse {
	success: string;
	message: string;
	user: User;
	filtered: Filter;
}
