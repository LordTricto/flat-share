import {AccountSignals, HostSignals, InterestsType} from "@/redux/init/slice/initSlice.types";

import Filter from "@/models/filter";
import Housemate from "@/models/housemate";
import Notification from "@/models/notification";
import User from "@/models/user";
import UserReceivedRequest from "@/models/user-received-request";
import UserSentRequest from "@/models/user-sent-request";
import UserStatistics from "@/models/user-statistics";

export type MainInitForm = {
	id: string;
};

const test = {
	status: "success",
	message: "App Initialized Successfully",
	// todo - user plan
	data: {
		user_statistics: {
			plan: {
				active_plan: "starter",
				free_plan_active_send_request: 5,
				free_plan_active_receive_request: 10,
				free_plan_price: "free",
				starter_plan_active_send_request: 10,
				starter_plan_active_receive_request: 30,
				starter_plan_price: "₦1,000",
				starter_plan_price_raw: 1000,
				platinum_plan_active_send_request: 25,
				platinum_plan_active_receive_request: 40,
				platinum_plan_price: "₦10,000",
				platinum_plan_price_raw: 10000,
				gold_plan_active_send_request: 40,
				gold_plan_active_receive_request: 50,
				gold_plan_price: "₦17,000",
				gold_plan_price_raw: 17000,
			},
			total_sent_request: 9,
			total_received_request: 13,
			available_send_request: 10,
			available_receive_request: 30,
		},
	},
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
	host_fee: string;
	host_fee_raw: number;
	host_property_signal: HostSignals | null;
	signal: AccountSignals | null;
	user: User;
	messages: {
		home_message: string;
		home_cta: string;
		match_message: string;
		match_cta: string;
		message_alert_color: string;
	};
	filter: Filter | null;
	reset_filter_to_default: Filter | null;
	interests: InterestsType;
	connection: Housemate[];
	suggestions: Housemate[];
	views_no: number;
	new_views_no: number;
	reviews_no: number;
	new_reviews_no: number;
	sent_request: UserSentRequest;
	received_request: UserReceivedRequest;
	total_request: number;
	user_statistics: UserStatistics;
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
