import {ExploreFilterForm, ExploreFilterFormResponse} from "./explore.constants";

import {GenericObject} from "@/helpers/types";
import Housemate from "@/models/housemate";
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

	const meta = {
		current_page: Parsers.number((metaData as GenericObject).current_page),
		firstItem: Parsers.number((metaData as GenericObject).firstItem),
		lastItem: Parsers.number((metaData as GenericObject).lastItem),
		per_page: Parsers.number((metaData as GenericObject).per_page),
		total_items: Parsers.number((metaData as GenericObject).total_items),
		last_page: Parsers.number((metaData as GenericObject).last_page),
	};

	const messages = {
		home_message: Parsers.string((messageData as GenericObject).home_message),
		home_cta: Parsers.string((messageData as GenericObject).home_cta),
		match_message: Parsers.string((messageData as GenericObject).match_message),
		match_cta: Parsers.string((messageData as GenericObject).match_cta),
		message_alert_color: Parsers.string((messageData as GenericObject).message_alert_color),
	};

	return {
		status: Parsers.string(res.status),
		message: Parsers.string(res.message),
		meta,
		signal: Parsers.string(res.signal),
		host_property_signal: Parsers.string(res.host_property_signal),
		messages,
		suggestions: Parsers.classObjectArray((res.data as GenericObject).suggestions, Housemate),
	};
};
