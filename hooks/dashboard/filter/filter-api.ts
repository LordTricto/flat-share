import {FilterForm, FilterFormResponse} from "./filter.constants";

import Filter from "@/models/filter";
import {GenericObject} from "@/helpers/types";
import Housemate from "@/models/housemate";
import Parsers from "@/utils/parsers";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeRequestWithSignal} from "@/helpers/request/makeRequest";

export enum filterSignal {
	FILTER = "user.filter",
}

export const filterApi = async (data: FilterForm): Promise<FilterFormResponse> => {
	const signal = getAbortControllerSignal(filterSignal.FILTER);
	const res = await makeRequestWithSignal("user/update/filter", data, signal);
	if (res instanceof Error) {
		throw res;
	}
	const metaData = (res.data as GenericObject).meta;
	const sentRequestData = (res.data as GenericObject).sent_request;
	const receivedRequestData = (res.data as GenericObject).received_request;

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

	return {
		success: Parsers.string(res.success),
		message: Parsers.string(res.message),
		signal: Parsers.string(res.message),
		filter: Parsers.classObjectNonNullable((res.data as GenericObject).filter, Filter),
		reset_filter_to_default: Parsers.classObjectNonNullable((res.data as GenericObject).reset_filter_to_default, Filter),
		meta: meta,
		connection: Parsers.classObjectArray((res.data as GenericObject).user, Housemate),
		suggestions: Parsers.classObjectArray((res.data as GenericObject).user, Housemate),
		sent_request: sentRequest,
		received_request: receivedRequest,
	};
};
