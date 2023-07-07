import Filter from "@/models/filter";
import {GenericObject} from "@/helpers/types";
import {LoadUserDataFormResponse} from "./init.constants";
import Parsers from "@/utils/parsers";
import User from "@/models/user";
import {makeGetRequest} from "@/helpers/request/makeRequest";

export const loadUserDataApi = async (): Promise<LoadUserDataFormResponse> => {
	const res = await makeGetRequest("user/load/user/fulldata");
	if (res instanceof Error) {
		throw res;
	}
	return {
		success: Parsers.string(res.success),
		message: Parsers.string(res.message),
		user: Parsers.classObjectNonNullable((res.data as GenericObject).user, User),
		filtered: Parsers.classObjectNonNullable((res.data as GenericObject).filter, Filter),
	};
};
