import {SignInForm, SignInFormResponse} from "@/hooks/sign-in/sign-in.constants";

import Filter from "@/models/filter";
import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import User from "@/models/user";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeRequestWithSignal} from "@/helpers/request/makeRequest";

export enum SignInSignal {
	SIGN_IN = "user.sign-in",
}

export const signInApi = async (data: SignInForm): Promise<SignInFormResponse> => {
	const signal = getAbortControllerSignal(SignInSignal.SIGN_IN);
	const res = await makeRequestWithSignal("user/auth/login", data, signal);
	if (res instanceof Error) {
		throw res;
	}

	return {
		success: Parsers.string(res.success),
		message: Parsers.string(res.message),
		token: Parsers.string((res.data as GenericObject).token),
		user: Parsers.classObjectNonNullable((res.data as GenericObject).user, User),
		filtered: Parsers.classObjectNonNullable((res.data as GenericObject).filter, Filter),
		interests: {
			food: Parsers.stringArray(((res.data as GenericObject).filter as GenericObject).food),
			music: Parsers.stringArray(((res.data as GenericObject).filter as GenericObject).music),
			sports: Parsers.stringArray(((res.data as GenericObject).filter as GenericObject).sports),
			others: Parsers.stringArray(((res.data as GenericObject).filter as GenericObject).others),
			film_and_tv: Parsers.stringArray(((res.data as GenericObject).filter as GenericObject).film_and_tv),
		},
	};
};
