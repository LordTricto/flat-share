import {SignUpForm, SignUpFormResponse} from "./sign-up.constants";

import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import UserMin from "@/models/userMin";
import {makeRequest} from "@/helpers/request/makeRequest";

export const signUpApi = async (data: SignUpForm): Promise<SignUpFormResponse> => {
	const res = await makeRequest("user/auth/register", data);
	if (res instanceof Error) {
		throw res;
	}
	return {
		success: Parsers.string(res.success),
		message: Parsers.string(res.message),
		user: Parsers.classObjectNonNullable((res.data as GenericObject).user, UserMin),
	};
};