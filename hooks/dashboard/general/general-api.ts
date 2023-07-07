import {makeGetRequest, makeRequest} from "@/helpers/request/makeRequest";

export const loginCheckApi = async (): Promise<void> => {
	const res = await makeGetRequest("user/auth/is-authenticated");
	if (res instanceof Error) {
		throw res;
	}
	return;
};

export const logoutUserApi = async (): Promise<void> => {
	const res = await makeRequest("user/auth/logout", {});
	if (res instanceof Error) {
		throw res;
	}
	return;
};
