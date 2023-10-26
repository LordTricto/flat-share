import {UpdateInterestsForm, UpdateInterestsFormResponse} from "./update-interests.constants";

import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeRequestWithSignal} from "@/helpers/request/makeRequest";

export enum UpdateInterestsSignal {
	UPDATE_INTERESTS = "user.update-interests",
}

export const updateInterestsApi = async (data: UpdateInterestsForm): Promise<UpdateInterestsFormResponse> => {
	const signal = getAbortControllerSignal(UpdateInterestsSignal.UPDATE_INTERESTS);
	const res = await makeRequestWithSignal("user/user/interest-update", data, signal);
	if (res instanceof Error) {
		throw res;
	}

	return {
		success: Parsers.string(res.success),
		message: Parsers.string(res.message),
		interests: {
			food: Parsers.stringArray(((res.data as GenericObject).interests as GenericObject).food),
			music: Parsers.stringArray(((res.data as GenericObject).interests as GenericObject).music),
			others: Parsers.stringArray(((res.data as GenericObject).interests as GenericObject).others),
			sports: Parsers.stringArray(((res.data as GenericObject).interests as GenericObject).sports),
			film_and_tv: Parsers.stringArray(((res.data as GenericObject).interests as GenericObject).film_and_tv),
		},
	};
};
