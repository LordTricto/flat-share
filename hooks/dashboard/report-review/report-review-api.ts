import {ReportReviewForm, ReportReviewFormResponse} from "./report-review.constants";

import Parsers from "@/utils/parsers";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeRequestWithSignal} from "@/helpers/request/makeRequest";

export enum ReportReviewSignal {
	REPORT_REVIEW = "user.report-review",
}

export const reportReviewApi = async (data: ReportReviewForm): Promise<ReportReviewFormResponse> => {
	const signal = getAbortControllerSignal(ReportReviewSignal.REPORT_REVIEW);
	const res = await makeRequestWithSignal("user/report/member", data, signal);

	if (res instanceof Error) {
		throw res;
	}

	return {
		status: Parsers.string(res.status),
		message: Parsers.string(res.message),
	};
};
