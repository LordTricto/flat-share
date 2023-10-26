import {ReportHousemateForm, ReportHousemateFormResponse} from "./report-housemate.constants";

import Parsers from "@/utils/parsers";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeRequestWithSignal} from "@/helpers/request/makeRequest";

export enum ReportHousemateSignal {
	REPORT_HOUSEMATE = "user.report-housemate",
}

export const reportHousemateApi = async (data: ReportHousemateForm): Promise<ReportHousemateFormResponse> => {
	const signal = getAbortControllerSignal(ReportHousemateSignal.REPORT_HOUSEMATE);
	const res = await makeRequestWithSignal("user/report/member", data, signal);

	if (res instanceof Error) {
		throw res;
	}

	return {
		status: Parsers.string(res.status),
		message: Parsers.string(res.message),
	};
};
