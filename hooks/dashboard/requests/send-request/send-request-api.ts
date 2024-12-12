import {SendRequestForm, SendRequestFormResponse} from "./send-request.constants";

import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import UserStatistics from "@/models/user-statistics";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeRequestWithSignal} from "@/helpers/request/makeRequest";

export enum sendRequestSignal {
	SEND_REQUEST = "user.send-request",
}

export const sendRequestApi = async (data: SendRequestForm): Promise<SendRequestFormResponse> => {
	const signal = getAbortControllerSignal(sendRequestSignal.SEND_REQUEST);

	const res = await makeRequestWithSignal(`user/send/request/${data.id}`, {}, signal);
	if (res instanceof Error) {
		throw res;
	}

	return {
		success: Parsers.string(res.success),
		message: Parsers.string(res.message),
		signal: Parsers.string(res.signal),
		statistics: Parsers.classObjectNonNullable(res.statistics, UserStatistics),
	};
};
