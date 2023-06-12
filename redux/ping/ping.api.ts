import {makeRequest} from "../../helpers/request/makeRequest";

export async function ping(): Promise<void> {
	const res = await makeRequest("/ping");
	if (res instanceof Error) {
		throw res;
	}
}
