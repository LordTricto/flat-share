import {UserReligion, UserType} from "@/models/user.constant";

import Filter from "@/models/filter";
import Housemate from "@/models/housemate";

export type UpdatePreferenceForm = {
	filter_preferred_user_type: UserType | null;
	filter_age_range_1: number;
	filter_age_range_2: number;
	filter_education: string;
	filter_gender: string;
	filter_location_1: string;
	filter_location_2: string;
	filter_state: string;
	filter_max_budget: string;
	filter_min_budget: string;
	filter_religion: UserReligion | null;
};

export type UpdatePreferenceFormResponse = {
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
