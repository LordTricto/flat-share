import {PublishReviewForm, PublishReviewFormResponse} from "./publish-review.constants";

import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import Review from "@/models/review";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeRequestWithSignal} from "@/helpers/request/makeRequest";

export enum PublishReviewSignal {
	PUBLISH_REVIEW = "user.publish-review",
}

export const publishReviewApi = async (data: PublishReviewForm): Promise<PublishReviewFormResponse> => {
	const signal = getAbortControllerSignal(PublishReviewSignal.PUBLISH_REVIEW);
	const res = await makeRequestWithSignal("user/publish/reviews", data, signal);

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
			reviewers: Parsers.classObjectArray((res.data as GenericObject).reviewers, Review),
		},
	};
};
