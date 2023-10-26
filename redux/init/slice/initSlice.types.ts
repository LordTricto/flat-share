import Filter from "@/models/filter";
import User from "../../../models/user";

export type InterestsType = {
	food: string[];
	music: string[];
	others: string[];
	sports: string[];
	film_and_tv: string[];
};
export interface InitState {
	isLoggedIn: boolean;

	isInitError: string | null;
	isInitLoading: boolean;

	isAccountCreated: boolean;
	user: User | null;
	filter: Filter | null;
	interests: InterestsType;
}
