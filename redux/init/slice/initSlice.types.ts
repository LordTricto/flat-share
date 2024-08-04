import Filter from "@/models/filter";
import User from "../../../models/user";

export type InterestsType = {
	food: string[];
	music: string[];
	others: string[];
	sports: string[];
	film_and_tv: string[];
};

export enum AccountSignals {
	SETUP_UNCOMPLETED = "account_setup_uncompleted",
	UNVERIFIED_ACCOUNT = "unverified_account",
	OFFLINE = "user_offline",
	CONNECTED = "user_connected",
	SUSPENDED = "user_suspended",
}

export enum HostSignals {
	HOST_PAY_TO_POST = "host_user_yet_to_pay_to_post_property",
	HOST_NO_PROPERTY = "host_user_with_no_property",
}

export interface InitState {
	user: User | null;
	filter: Filter | null;
	interests: InterestsType;
	isLoggedIn: boolean;
	isInitError: string | null;
	isInitLoading: boolean;
	isAccountCreated: boolean;
}
