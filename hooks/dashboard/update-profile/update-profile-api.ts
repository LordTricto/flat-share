import {UpdateProfileForm, UpdateProfileFormResponse} from "./update-profile.constants";

import Filter from "@/models/filter";
import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import User from "@/models/user";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeRequestWithSignal} from "@/helpers/request/makeRequest";

export enum UpdateProfileSignal {
	UPDATE_PROFILE = "user.update-profile",
}

export const updateProfileApi = async (data: UpdateProfileForm): Promise<UpdateProfileFormResponse> => {
	const signal = getAbortControllerSignal(UpdateProfileSignal.UPDATE_PROFILE);
	const res = await makeRequestWithSignal("user/update/profile", data, signal);
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
