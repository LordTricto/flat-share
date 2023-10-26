import Filter from "@/models/filter";
import Housemate from "@/models/housemate";
import Notification from "@/models/notification";

export type MainInitForm = {
	id: string;
};

export type MainInitFormResponse = {
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
	app_abuse_email: string;
	app_support_email: string;
	host_fee: number;
	signal: string;
	messages: {
		home_message: string;
		home_cta: string;
		match_message: string;
		match_cta: string;
		message_alert_color: string;
	};
	filter: Filter[];
	reset_filter_to_default: Filter[];
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
		total_sent_request: number;
		total_received_request: number;
		available_send_request: number;
		available_receive_request: number;
	};
	notification: {
		notification_pagination_meta: {
			current_page: number;
			firstItem: number;
			lastItem: number;
			per_page: number;
			total_items: number;
			last_page: number;
		};
		notifications_meta: {
			total_notifications: number;
			total_new_notifications: number;
		};
		notifications: Notification[];
	};
};
