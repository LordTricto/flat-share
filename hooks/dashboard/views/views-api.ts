import Filter from "@/models/filter";
import {GenericObject} from "@/helpers/types";
import Housemate from "@/models/housemate";
import Notification from "@/models/notification";
import Parsers from "@/utils/parsers";
import View from "@/models/view";
import {ViewsFormResponse} from "./views.constants";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeGetRequestWithSignal} from "@/helpers/request/makeRequest";
import store from "@/redux/store";

export enum viewsSignal {
	VIEWS = "user.views",
}

export const viewsApi = async (): Promise<ViewsFormResponse> => {
	const signal = getAbortControllerSignal(viewsSignal.VIEWS);
	const res = await makeGetRequestWithSignal(`user/load/views/1/${store.getState().init?.user?.codec || ""}`, signal);
	if (res instanceof Error) {
		throw res;
	}
	const metaData = (res.data as GenericObject).meta;
	const meta = {
		current_page: Parsers.number((metaData as GenericObject).current_page),
		firstItem: Parsers.number((metaData as GenericObject).firstItem),
		lastItem: Parsers.number((metaData as GenericObject).lastItem),
		per_page: Parsers.number((metaData as GenericObject).per_page),
		total_items: Parsers.number((metaData as GenericObject).total_items),
		last_page: Parsers.number((metaData as GenericObject).last_page),
	};

	return {
		status: Parsers.string(res.status),
		message: Parsers.string(res.message),
		meta,
		views_no: Parsers.number((res.data as GenericObject).views_no),
		new_views_no: Parsers.number((res.data as GenericObject).new_views_no),
		viewers: Parsers.classObjectArray((res.data as GenericObject).viewers, View),
	};
};
