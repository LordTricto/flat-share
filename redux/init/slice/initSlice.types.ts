import Filter from "@/models/filter";
import User from "../../../models/user";

export interface InitState {
	isLoggedIn: boolean;

	isInitError: string | null;
	isInitLoading: boolean;

	isAccountCreated: boolean;
	user: User | null;
	filter: Filter | null;
}
