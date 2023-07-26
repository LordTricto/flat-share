import {makeGetRequest, makeRequest} from "@/helpers/request/makeRequest";

import Parsers from "@/utils/parsers";

export const loginCheckApi = async (): Promise<{message: string; success: string}> => {
	const res = await makeRequest("user/auth/is-authenticated");
	if (res instanceof Error) {
		throw res;
	}
	return {
		success: Parsers.string(res.success),
		message: Parsers.string(res.message),
	};
};

export const logoutUserApi = async (): Promise<void> => {
	const res = await makeRequest("user/auth/logout", {});
	if (res instanceof Error) {
		throw res;
	}
	return;
};
