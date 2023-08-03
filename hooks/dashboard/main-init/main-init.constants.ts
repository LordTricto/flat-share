import Filter from "@/models/filter";
import Housemate from "@/models/housemate";
import Notification from "@/models/notification";

export type MainInitForm = {
	id: string;
};

export type MainInitFormResponse = {
	success: string;
	message: string;
	signal: string;
	filter: Filter[];
	reset_filter_to_default: Filter[];
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
	views_no: number;
	new_views_no: number;
	reviews_no: number;
	new_reviews_no: number;
	sent_request: {
		sent_request_no: number;
		sent_request_data: Housemate[];
	};
	received_request: {
		received_request_no: number;
		received_request_data: Housemate[];
	};
	total_request: number;
	user_statistics: {
		unique_profile_views: number;
		total_sent_request: number;
		active_sent_request: number;
		total_received_request: number;
		active_received_request: number;
		unseen_received_reviews: number;
		total_reviews_received: number;
		reviews_sent: number;
	};
	notifications_meta: {
		total_notifications: number;
		total_new_notifications: number;
	};
	notifications: Notification[];
};
