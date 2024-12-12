import {AcceptRequestForm, AcceptRequestFormResponse} from "./accept-request.constants";

import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeRequestWithSignal} from "@/helpers/request/makeRequest";

export enum acceptRequestSignal {
	ACCEPT_REQUEST = "user.accept-request",
}

export const acceptRequestApi = async (data: AcceptRequestForm): Promise<AcceptRequestFormResponse> => {
	const signal = getAbortControllerSignal(acceptRequestSignal.ACCEPT_REQUEST);

	const res = await makeRequestWithSignal(`user/create/match/${data.id}`, {}, signal);
	if (res instanceof Error) {
		throw res;
	}

	return {
		message: Parsers.string(res.message),
		signal: Parsers.string(res.signal),
		partners_phone: Parsers.string(res.partners_phone),
		status: Parsers.string(res.status),
	};
};
