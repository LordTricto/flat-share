import {GetStartedForm, GetStartedFormResponse} from "./get-started.constants";

import Filter from "@/models/filter";
import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import User from "@/models/user";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeRequestWithSignal} from "@/helpers/request/makeRequest";

export enum GetStartedSignal {
	GET_STARTED = "user.get-started",
}

export const getStartedApi = async (data: GetStartedForm): Promise<GetStartedFormResponse> => {
	const signal = getAbortControllerSignal(GetStartedSignal.GET_STARTED);
	const res = await makeRequestWithSignal("user/user/account/setup", data, signal);
	if (res instanceof Error) {
		throw res;
	}

	return {
		success: Parsers.string(res.success),
		message: Parsers.string(res.message),
		user: Parsers.classObjectNonNullable((res.data as GenericObject).user, User),
		filtered: Parsers.classObjectNonNullable((res.data as GenericObject).filter, Filter),
	};
};
