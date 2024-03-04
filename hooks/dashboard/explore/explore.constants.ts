import Filter from "@/models/filter";
import Housemate from "@/models/housemate";
import Notification from "@/models/notification";
import {UserSex} from "@/models/user.constant";

export enum FilterOptions {
	NONE = 0,
	BUDGET = 1,
	LOCATION = 2,
	STATE = 3,
	AGE = 4,
	EDUCATION = 5,
	GENDER = 6,
	RELIGION = 7,
}

export type ExploreFilterForm = {
	min_budget?: number;
	max_budget?: number;
	location?: string[];

	preferred_first_age_range?: number;
	preferred_second_age_range?: number;
	preferred_sex?: string[];
	preferred_education?: string[];
	preferred_religion?: string[];
};

export type ExploreFilterFormResponse = {
	status: string;
	message: string;
	meta: {
		current_page: number;
		firstItem: number;
		lastItem: number;
		per_page: number;
		total_items: number;
		last_page: number;
	};
	signal: string;
	host_property_signal: string;
	messages: {
		home_message: string;
		home_cta: string;
		match_message: string;
		match_cta: string;
		message_alert_color: string;
	};
	suggestions: Housemate[];
};
