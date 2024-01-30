import {ExploreFilterForm, ExploreFilterFormResponse} from "./explore.constants";

import Filter from "@/models/filter";
import {GenericObject} from "@/helpers/types";
import Housemate from "@/models/housemate";
import Notification from "@/models/notification";
import Parsers from "@/utils/parsers";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeRequestWithSignal} from "@/helpers/request/makeRequest";

export enum exploreSignal {
	FILTER = "explore.filter",
}

export const filterApi = async (data: ExploreFilterForm): Promise<ExploreFilterFormResponse> => {
	const signal = getAbortControllerSignal(exploreSignal.FILTER);
	const res = await makeRequestWithSignal("user/fetch/filtered/suggestions/1", data, signal);
	if (res instanceof Error) {
		throw res;
	}
	const metaData = (res.data as GenericObject).meta;
	const messageData = (res.data as GenericObject).messages;
	const sentRequestData = (res.data as GenericObject).sent_request;
	const userStatisticsData = (res.data as GenericObject).user_statistics;
	const receivedRequestData = (res.data as GenericObject).received_request;
	const notificationsMeta = ((res.data as GenericObject).notification as GenericObject).notifications_meta;
	const notificationPaginationMeta = ((res.data as GenericObject).notification as GenericObject).notification_pagination_meta;

	const meta = {
		current_page: Parsers.number((metaData as GenericObject).current_page),
		firstItem: Parsers.number((metaData as GenericObject).firstItem),
		lastItem: Parsers.number((metaData as GenericObject).lastItem),
		per_page: Parsers.number((metaData as GenericObject).per_page),
		total_items: Parsers.number((metaData as GenericObject).total_items),
		last_page: Parsers.number((metaData as GenericObject).last_page),
	};
	const sent_request = {
		sent_request_no: Parsers.number((sentRequestData as GenericObject).sent_request_no),
		sent_request_data: Parsers.classObjectArray((sentRequestData as GenericObject).sent_request_data, Housemate),
	};
	const received_request = {
		received_request_no: Parsers.number((receivedRequestData as GenericObject).received_request_no),
		received_request_data: Parsers.classObjectArray((receivedRequestData as GenericObject).received_request_data, Housemate),
	};
	// const user_statistics = {
	// total_sent_request: Parsers.number((userStatisticsData as GenericObject).total_sent_request),
	// total_received_request: Parsers.number((userStatisticsData as GenericObject).total_received_request),
	// available_send_request: Parsers.number((userStatisticsData as GenericObject).available_send_request),
	// available_receive_request: Parsers.number((userStatisticsData as GenericObject).available_receive_request),
	// };
	const messages = {
		home_message: Parsers.string((messageData as GenericObject).home_message),
		home_cta: Parsers.string((messageData as GenericObject).home_cta),
		match_message: Parsers.string((messageData as GenericObject).match_message),
		match_cta: Parsers.string((messageData as GenericObject).match_cta),
		message_alert_color: Parsers.string((messageData as GenericObject).message_alert_color),
	};
	const notification = {
		notification_pagination_meta: {
			current_page: Parsers.number((notificationPaginationMeta as GenericObject).current_page),
			firstItem: Parsers.number((notificationPaginationMeta as GenericObject).firstItem),
			lastItem: Parsers.number((notificationPaginationMeta as GenericObject).lastItem),
			per_page: Parsers.number((notificationPaginationMeta as GenericObject).per_page),
			total_items: Parsers.number((notificationPaginationMeta as GenericObject).total_items),
			last_page: Parsers.number((notificationPaginationMeta as GenericObject).last_page),
		},
		notifications_meta: {
			total_notifications: Parsers.number((notificationsMeta as GenericObject).total_notifications),
			total_new_notifications: Parsers.number((notificationsMeta as GenericObject).total_new_notifications),
		},
		notifications: Parsers.classObjectArray(((res.data as GenericObject).notification as GenericObject).notifications, Notification),
	};

	return {
		status: Parsers.string(res.status),
		message: Parsers.string(res.message),
		meta,
		app_abuse_email: Parsers.string(res.app_abuse_email),
		app_support_email: Parsers.string(res.app_support_email),
		host_fee: Parsers.number(res.host_fee),
		signal: Parsers.string(res.signal),
		host_property_signal: Parsers.string(res.host_property_signal),
		messages,
		filter: Parsers.classObjectArray((res.data as GenericObject).filter, Filter),
		reset_filter_to_default: Parsers.classObjectArray((res.data as GenericObject).reset_filter_to_default, Filter),
		connection: Parsers.classObjectArray((res.data as GenericObject).connection, Housemate),
		suggestions: Parsers.classObjectArray((res.data as GenericObject).suggestions, Housemate),
		views_no: Parsers.number(res.views_no),
		new_views_no: Parsers.number(res.new_views_no),
		reviews_no: Parsers.number(res.reviews_no),
		new_reviews_no: Parsers.number(res.new_reviews_no),
		sent_request,
		received_request,
		total_request: Parsers.number(res.total_request),
		// user_statistics,
		notification,
	};
};
