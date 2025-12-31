import {AccountSignals, HostSignals} from "@/redux/init/slice/initSlice.types";

import Filter from "@/models/filter";
import {GenericObject} from "@/helpers/types";
import Housemate from "@/models/housemate";
import {MainInitFormResponse} from "./main-init.constants";
import Notification from "@/models/notification";
import Parsers from "@/utils/parsers";
import User from "@/models/user";
import UserReceivedRequest from "@/models/user-received-request";
import UserSentRequest from "@/models/user-sent-request";
import UserStatistics from "@/models/user-statistics";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeGetRequestWithSignal} from "@/helpers/request/makeRequest";
import store from "@/redux/store";

export enum mainInitSignal {
	MAIN_INIT = "user.main-init",
}

export const mainInitApi = async (): Promise<MainInitFormResponse> => {
	const signal = getAbortControllerSignal(mainInitSignal.MAIN_INIT);
	const res = await makeGetRequestWithSignal(`user/fetch/potentials/partners/1${store.getState().init?.user?.id || ""}`, signal);
	if (res instanceof Error) {
		throw res;
	}
	const metaData = (res.data as GenericObject).meta;
	const messageData = (res.data as GenericObject).messages;
	const interestsData = (res.data as GenericObject).interests;
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
	const user_statistics = {
		total_sent_request: Parsers.number((userStatisticsData as GenericObject).total_sent_request),
		total_received_request: Parsers.number((userStatisticsData as GenericObject).total_received_request),
		available_send_request: Parsers.number((userStatisticsData as GenericObject).available_send_request),
		available_receive_request: Parsers.number((userStatisticsData as GenericObject).available_receive_request),
	};
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

	const interests = {
		food: Parsers.stringArray((interestsData as GenericObject).food),
		music: Parsers.stringArray((interestsData as GenericObject).music),
		others: Parsers.stringArray((interestsData as GenericObject).others),
		sports: Parsers.stringArray((interestsData as GenericObject).sports),
		film_and_tv: Parsers.stringArray((interestsData as GenericObject).film_and_tv),
	};
	return {
		status: Parsers.string(res.status),
		message: Parsers.string(res.message),
		meta,
		app_abuse_email: Parsers.string((res.data as GenericObject).app_abuse_email),
		app_support_email: Parsers.string((res.data as GenericObject).app_support_email),
		host_fee: Parsers.string((res.data as GenericObject).host_fee),
		host_fee_raw: Parsers.number((res.data as GenericObject).host_fee_raw),
		host_property_signal: Parsers.nullableEnum((res.data as GenericObject).host_property_signal, HostSignals),
		signal: Parsers.nullableEnum((res.data as GenericObject).signal, AccountSignals),
		user: Parsers.classObjectNonNullable((res.data as GenericObject).logged_in_user, User),
		messages,
		filter: Parsers.classObject((res.data as GenericObject).filter, Filter),
		reset_filter_to_default: Parsers.classObject((res.data as GenericObject).reset_filter_to_default, Filter),
		interests,
		connection: Parsers.classObjectArray((res.data as GenericObject).connection, Housemate),
		suggestions: Parsers.classObjectArray((res.data as GenericObject).suggestions, Housemate),
		views_no: Parsers.number((res.data as GenericObject).views_no),
		new_views_no: Parsers.number((res.data as GenericObject).new_views_no),
		reviews_no: Parsers.number((res.data as GenericObject).reviews_no),
		new_reviews_no: Parsers.number((res.data as GenericObject).new_reviews_no),
		sent_request: UserSentRequest.create(sent_request),
		received_request: UserReceivedRequest.create(received_request),
		total_request: Parsers.number((res.data as GenericObject).total_request),
		user_statistics: Parsers.classObjectNonNullable((res.data as GenericObject).user_statistics, UserStatistics),
		notification,
	};
};
