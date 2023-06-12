import {UserReligion, UserSex, UserType} from "@/models/user.constant";

import Filter from "@/models/filter";
import User from "../../../models/user";

export interface InitState {
	isLoggedIn: boolean;

	isInitError: string | null;
	isInitLoading: boolean;

	user: User | null;
	token: string | null;
	filter: Filter | null;
}

// export interface filterInterface {
// 	preferred_first_age_range: number | null;
// 	preferred_second_age_range: number | null;
// 	preferred_profession: string | null;
// 	preferred_religion: UserReligion | null;
// 	preferred_sex: UserSex | null;
// 	min_budget: number | null;
// 	max_budget: number | null;
// 	preferred_location_1: string | null;
// 	preferred_location_2: string | null;
// 	state_of_interest: string | null;
// 	preferred_user_type: UserType | null;
// }
