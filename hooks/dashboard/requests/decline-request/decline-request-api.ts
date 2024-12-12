import {DeclineRequestForm, DeclineRequestFormResponse} from "./decline-request.constants";

import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import UserStatistics from "@/models/user-statistics";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeDeleteRequestWithSignal} from "@/helpers/request/makeRequest";

export enum declineRequestSignal {
	DECLINE_REQUEST = "user.decline-request",
}

export const declineRequestApi = async (data: DeclineRequestForm): Promise<DeclineRequestFormResponse> => {
	const signal = getAbortControllerSignal(declineRequestSignal.DECLINE_REQUEST);

	const res = await makeDeleteRequestWithSignal(`user/delete/received/request/${data.id}`, {}, signal);
	if (res instanceof Error) {
		throw res;
	}

	return {
		message: Parsers.string(res.message),
		signal: Parsers.string(res.signal),
		status: Parsers.string(res.status),
		statistics: Parsers.classObjectNonNullable(res.statistics, UserStatistics),
	};
};
