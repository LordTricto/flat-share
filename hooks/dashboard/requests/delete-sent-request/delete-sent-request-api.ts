import {DeleteSentRequestForm, DeleteSentRequestFormResponse} from "./delete-sent-request.constants";
import {makeDeleteRequestWithSignal, makeRequestWithSignal} from "@/helpers/request/makeRequest";

import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import UserStatistics from "@/models/user-statistics";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";

export enum deleteSentRequestSignal {
	DELETE_REQUEST = "user.delete-sent-request",
}

export const deleteSentRequestApi = async (data: DeleteSentRequestForm): Promise<DeleteSentRequestFormResponse> => {
	const signal = getAbortControllerSignal(deleteSentRequestSignal.DELETE_REQUEST);

	const res = await makeDeleteRequestWithSignal(`user/delete/sent/request/${data.id}`, {}, signal);
	if (res instanceof Error) {
		throw res;
	}

	return {
		status: Parsers.string(res.status),
		signal: Parsers.string(res.signal),
		message: Parsers.string(res.message),
		statistics: Parsers.classObjectNonNullable(res.statistics, UserStatistics),
	};
};
