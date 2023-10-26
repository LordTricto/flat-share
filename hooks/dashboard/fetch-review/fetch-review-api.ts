import {FetchReviewForm, FetchReviewFormResponse} from "./fetch-review.constants";

import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import Review from "@/models/review";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeGetRequestWithSignal} from "@/helpers/request/makeRequest";

export enum FetchReviewSignal {
	FETCH_REVIEW = "user.fetch_review",
}

export const fetchReviewApi = async (_id: string): Promise<FetchReviewFormResponse> => {
	const signal = getAbortControllerSignal(FetchReviewSignal.FETCH_REVIEW);
	const res = await makeGetRequestWithSignal(`user/load/reviews/1/${_id || ""}`, signal);

	if (res instanceof Error) {
		throw res;
	}

	return {
		status: Parsers.string(res.status),
		message: Parsers.string(res.message),
		data: {
			meta: {
				current_page: Parsers.number((res.data as GenericObject).current_page),
				firstItem: Parsers.number((res.data as GenericObject).firstItem),
				lastItem: Parsers.number((res.data as GenericObject).lastItem),
				per_page: Parsers.number((res.data as GenericObject).per_page),
				total_items: Parsers.number((res.data as GenericObject).total_items),
				last_page: Parsers.number((res.data as GenericObject).last_page),
			},
			new_reviews_no: Parsers.number((res.data as GenericObject).reviews_no, 0),
			reviewers: Parsers.classObjectArray((res.data as GenericObject).reviewers, Review),
			reviews_no: Parsers.number((res.data as GenericObject).reviews_no, 0),
		},
	};
};
