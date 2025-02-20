import {ResetPasswordForm, ResetPasswordFormResponse} from "./reset-password.constants";

import Parsers from "@/utils/parsers";
import {makeRequest} from "@/helpers/request/makeRequest";

export const resetPasswordApi = async (data: ResetPasswordForm): Promise<ResetPasswordFormResponse> => {
	const res = await makeRequest("user/auth/reset-password", data);
	if (res instanceof Error) {
		throw res;
	}
	return {
		success: Parsers.string(res.success),
		message: Parsers.string(res.message),
	};
};
