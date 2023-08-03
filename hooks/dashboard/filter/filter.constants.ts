import Filter from "@/models/filter";
import Housemate from "@/models/housemate";
import {UserSex} from "@/models/user.constant";

export type FilterForm = {
	filter_gender: UserSex;
	filter_age_range_1: number;
	filter_age_range_2: number;
	filter_preferred_user_type: string;
	filter_min_budget: number;
	filter_max_budget: number;
	filter_religion: string;
	filter_state: string;
	filter_location_1: string;
	filter_location_2: string;
	filter_education: string;
};

export type FilterFormResponse = {
	success: string;
	message: string;
	signal: string;
	filter: Filter;
	reset_filter_to_default: Filter;
	meta: {
		current_page: number;
		firstItem: number;
		lastItem: number;
		per_page: number;
		total_items: number;
		last_page: number;
	};
	connection: Housemate[];
	suggestions: Housemate[];
	sent_request: {
		sent_request_no: number;
		sent_request_data: Housemate[];
	};
	received_request: {
		received_request_no: number;
		received_request_data: Housemate[];
	};
};
