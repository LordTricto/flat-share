import {SendRequestForm, SendRequestFormResponse} from "./send-request.constants";

import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
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
		statistics: {
			available_receive_request: Parsers.number((res.statistics as GenericObject).available_receive_request),
			available_send_request: Parsers.number((res.statistics as GenericObject).available_send_request),
			total_received_request: Parsers.number((res.statistics as GenericObject).total_received_request),
			total_sent_request: Parsers.number((res.statistics as GenericObject).total_sent_request),
		},
	};
};
