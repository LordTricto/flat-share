// import {GetStartedForm, GetStartedFormResponse} from "./create-ad.constants";

import {UpdatePlanForm, UpdatePlanFormResponse} from "./plan.constants";

import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import User from "@/models/user";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeRequestWithSignal} from "@/helpers/request/makeRequest";

export enum UpdatePlanSignal {
	UPDATE_PLAN = "user.update-plan",
}

export const updatePlanApi = async (data: UpdatePlanForm): Promise<UpdatePlanFormResponse> => {
	const signal = getAbortControllerSignal(UpdatePlanSignal.UPDATE_PLAN);
	const res = await makeRequestWithSignal("user/account/upgrade", data, signal);
	if (res instanceof Error) {
		throw res;
	}

	return {
		status: Parsers.string(res.status),
		message: Parsers.string(res.message),
		data: res.data
			? {
					amount: Parsers.string((res.data as GenericObject).amount),
					payment_method: Parsers.string((res.data as GenericObject).payment_method),
					purchase_date: Parsers.string((res.data as GenericObject).purchase_date),
			  }
			: null,
	};
};
