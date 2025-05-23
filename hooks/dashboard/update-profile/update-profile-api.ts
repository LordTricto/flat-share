import {OtherPersonalDetailsForm, PersonalDetailsForm} from "../settings/settings.constants";

import Filter from "@/models/filter";
import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import {UpdateProfileFormResponse} from "./update-profile.constants";
import User from "@/models/user";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeRequestWithSignal} from "@/helpers/request/makeRequest";

export enum UpdateProfileSignal {
	UPDATE_PROFILE = "user.update-profile",
}

export const updateProfileApi = async (data: PersonalDetailsForm & OtherPersonalDetailsForm): Promise<UpdateProfileFormResponse> => {
	const signal = getAbortControllerSignal(UpdateProfileSignal.UPDATE_PROFILE);
	const res = await makeRequestWithSignal("user/update/profile", data, signal);
	if (res instanceof Error) {
		throw res;
	}

	return {
		success: Parsers.string(res.success),
		message: Parsers.string(res.message),
		user: Parsers.classObjectNonNullable((res.data as GenericObject).user, User),
		interests: {
			food: Parsers.stringArray(((res.data as GenericObject).interests as GenericObject).food),
			music: Parsers.stringArray(((res.data as GenericObject).interests as GenericObject).music),
			sports: Parsers.stringArray(((res.data as GenericObject).interests as GenericObject).sports),
			others: Parsers.stringArray(((res.data as GenericObject).interests as GenericObject).others),
			film_and_tv: Parsers.stringArray(((res.data as GenericObject).interests as GenericObject).film_and_tv),
		},
		filtered: Parsers.classObjectNonNullable((res.data as GenericObject).filter, Filter),
	};
};
