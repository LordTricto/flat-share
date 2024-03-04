import Filter from "@/models/filter";
import {GenericObject} from "@/helpers/types";
import {HousemateResponse} from "./housemate.constants";
import Parsers from "@/utils/parsers";
import User from "@/models/user";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeGetRequestWithSignal} from "@/helpers/request/makeRequest";

export enum HousemateSignal {
	GET = "housemate.get",
}

export const housemateApi = async (_id: string): Promise<HousemateResponse> => {
	const signal = getAbortControllerSignal(HousemateSignal.GET);

	const res = await makeGetRequestWithSignal(`user/load/user/fulldata/codec/${_id || ""}`, signal);

	if (res instanceof Error) {
		throw res;
	}

	return {
		success: Parsers.string(res.success),
		message: Parsers.string(res.message),
		user: Parsers.classObjectNonNullable((res.data as GenericObject).user, User),
		interests: {
			food: Parsers.stringArray(((res.data as GenericObject).interests as GenericObject).food),
			music: Parsers.stringArray(((res.data as GenericObject).interests as GenericObject).music),
			sports: Parsers.stringArray(((res.data as GenericObject).interests as GenericObject).sports),
			others: Parsers.stringArray(((res.data as GenericObject).interests as GenericObject).others),
			film_and_tv: Parsers.stringArray(((res.data as GenericObject).interests as GenericObject).film_and_tv),
		},
		filtered: Parsers.classObjectNonNullable((res.data as GenericObject).filter, Filter),
	};
};
