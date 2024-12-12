import Filter from "@/models/filter";
import Housemate from "@/models/housemate";
import User from "../../../models/user";
import UserRequest from "@/models/user-requests";
import UserStatistics from "@/models/user-statistics";

export type InterestsType = {
	food: string[];
	music: string[];
	others: string[];
	sports: string[];
	film_and_tv: string[];
};

export enum AccountSignals {
	APP_INIT = "app_init",
	SETUP_UNCOMPLETED = "account_setup_uncompleted",
	UNVERIFIED_ACCOUNT = "unverified_account",
	OFFLINE = "user_offline",
	CONNECTED = "user_connected",
	SUSPENDED = "user_suspended",
	HOST_USER_YET_TO_PAY = "host_user_yet_to_pay_to_post_property",
}

export enum HostSignals {
	UNPAID_PROPERTY_ADS_FEE = "unpaid-property-ads-fee",
	NO_PROPERTY = "no-property",
	ACTIVE_PROPERTY = "active-property",
}

export interface InitState {
	user: User | null;
	filter: Filter | null;
	requests: UserRequest | null;
	interests: InterestsType;
	isLoggedIn: boolean;
	hostSignal: HostSignals | null;
	isInitError: string | null;
	accountSignal: AccountSignals | null;
	isInitLoading: boolean;
	isAccountSetup: boolean;
	userStatistics: UserStatistics | null;
	isAccountCreated: boolean;
}
