import {ChangePasswordForm, ChangePasswordFormResponse} from "./change-password.constants";

import Parsers from "@/utils/parsers";
import {makeRequest} from "@/helpers/request/makeRequest";

export const changePasswordApi = async (data: ChangePasswordForm): Promise<ChangePasswordFormResponse> => {
	const res = await makeRequest("user/change/password", data);
	if (res instanceof Error) {
		throw res;
	}
	return {
		success: Parsers.string(res.success),
		message: Parsers.string(res.message),
	};
};
