import {ForgotPasswordForm, ForgotPasswordFormResponse} from "./forgot-password.constants";

import Parsers from "@/utils/parsers";
import {makeRequest} from "@/helpers/request/makeRequest";

export const forgotPasswordApi = async (data: ForgotPasswordForm): Promise<ForgotPasswordFormResponse> => {
	const res = await makeRequest("user/auth/forgot-password", data);
	if (res instanceof Error) {
		throw res;
	}
	return {
		success: Parsers.string(res.success),
		message: Parsers.string(res.message),
	};
};
