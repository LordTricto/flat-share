import {ContactUsForm, ContactUsFormResponse} from "./contact-us.constants";

import Parsers from "@/utils/parsers";
import {makeRequest} from "@/helpers/request/makeRequest";

export const contactUsApi = async (data: ContactUsForm): Promise<ContactUsFormResponse> => {
	const res = await makeRequest("user/contact", data);
	if (res instanceof Error) {
		throw res;
	}
	return {
		success: Parsers.string(res.success),
		message: Parsers.string(res.message),
	};
};
