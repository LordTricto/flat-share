import Filter from "@/models/filter";
import {InterestsType} from "@/redux/init/slice/initSlice.types";
import User from "@/models/user";

export interface HousemateResponse {
	success: string;
	message: string;
	user: User;
	filtered: Filter;
	interests: InterestsType;
}
