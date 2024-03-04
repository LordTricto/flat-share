import {UserReligion, UserSex} from "@/models/user.constant";

import Filter from "@/models/filter";
import {InterestsType} from "@/redux/init/slice/initSlice.types";
import User from "@/models/user";

export type UpdateProfileForm = {
	firstname: string;
	lastname: string;
	phone: string;
	email: string;
	profession: string;
	sex: UserSex | null;
	// age: number;
	religion: UserReligion | null;
	// budget: string;
	bio: string;
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
	interests: InterestsType;
}
