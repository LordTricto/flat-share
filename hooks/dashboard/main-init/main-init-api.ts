import Filter from "@/models/filter";
import {GenericObject} from "@/helpers/types";
import Housemate from "@/models/housemate";
import {MainInitFormResponse} from "./main-init.constants";
import Notification from "@/models/notification";
import Parsers from "@/utils/parsers";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeGetRequestWithSignal} from "@/helpers/request/makeRequest";
import store from "@/redux/store";

export enum mainInitSignal {
	MAIN_INIT = "user.main-init",
}

export const mainInitApi = async (): Promise<MainInitFormResponse> => {
	const signal = getAbortControllerSignal(mainInitSignal.MAIN_INIT);
	const res = await makeGetRequestWithSignal(`user/fetch/potentials/partners/1${store.getState().init.user?.id || ""}`, signal);
	if (res instanceof Error) {
		throw res;
	}
	const metaData = (res.data as GenericObject).meta;
	const sentRequestData = (res.data as GenericObject).sent_request;
	const receivedRequestData = (res.data as GenericObject).received_request;
	const user_statisticsData = (res.data as GenericObject).user_statistics;
	const notifications_metaData = (res.data as GenericObject).notifications_meta;

	const meta = {
		current_page: Parsers.number((metaData as GenericObject).current_page),
		firstItem: Parsers.number((metaData as GenericObject).firstItem),
		lastItem: Parsers.number((metaData as GenericObject).lastItem),
		per_page: Parsers.number((metaData as GenericObject).per_page),
		total_items: Parsers.number((metaData as GenericObject).total_items),
		last_page: Parsers.number((metaData as GenericObject).last_page),
	};
	const sentRequest = {
		sent_request_no: Parsers.number((sentRequestData as GenericObject).sent_request_no),
		sent_request_data: Parsers.classObjectArray((sentRequestData as GenericObject).sent_request_data, Housemate),
	};
	const receivedRequest = {
		received_request_no: Parsers.number((receivedRequestData as GenericObject).received_request_no),
		received_request_data: Parsers.classObjectArray((receivedRequestData as GenericObject).received_request_data, Housemate),
	};
	const notifications_meta = {
		total_notifications: Parsers.number((notifications_metaData as GenericObject).total_notifications),
		total_new_notifications: Parsers.number((notifications_metaData as GenericObject).total_new_notifications),
	};
	const user_statistics = {
		unique_profile_views: Parsers.number((user_statisticsData as GenericObject).unique_profile_views),
		total_sent_request: Parsers.number((user_statisticsData as GenericObject).total_sent_request),
		active_sent_request: Parsers.number((user_statisticsData as GenericObject).active_sent_request),
		total_received_request: Parsers.number((user_statisticsData as GenericObject).total_received_request),
		active_received_request: Parsers.number((user_statisticsData as GenericObject).active_received_request),
		unseen_received_reviews: Parsers.number((user_statisticsData as GenericObject).unseen_received_reviews),
		total_reviews_received: Parsers.number((user_statisticsData as GenericObject).total_reviews_received),
		reviews_sent: Parsers.number((user_statisticsData as GenericObject).reviews_sent),
	};

	return {
		success: Parsers.string(res.success),
		message: Parsers.string(res.message),
		signal: Parsers.string(res.message),
		filter: Parsers.classObjectArray((res.data as GenericObject).filter, Filter),
		reset_filter_to_default: Parsers.classObjectArray((res.data as GenericObject).reset_filter_to_default, Filter),
		meta: meta,
		connection: Parsers.classObjectArray((res.data as GenericObject).user, Housemate),
		suggestions: Parsers.classObjectArray((res.data as GenericObject).user, Housemate),
		views_no: Parsers.number(res.views_no),
		new_views_no: Parsers.number(res.new_views_no),
		reviews_no: Parsers.number(res.reviews_no),
		new_reviews_no: Parsers.number(res.new_reviews_no),
		sent_request: sentRequest,
		received_request: receivedRequest,
		total_request: Parsers.number(res.total_request),
		user_statistics: user_statistics,
		notifications_meta: notifications_meta,
		notifications: Parsers.classObjectArray((res.data as GenericObject).notifications, Notification),
	};
};
