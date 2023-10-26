import {UseQueryResult, useQuery} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {FetchReviewFormResponse} from "./fetch-review.constants";
import Review from "@/models/review";
import {fetchReviewApi} from "./fetch-review-api";

interface Props {
	id: string;
	onComplete: (_data: Review[]) => void;
}

function useFetchReviews(props: Props): UseQueryResult<FetchReviewFormResponse, AxiosError<any, any>> {
	const fetchReview = useQuery({
		queryKey: ["fetch-reviews"],
		refetchOnWindowFocus: false,
		retry: false,
		enabled: false, // disable this query from automatically running,
		queryFn: async () => {
			const res = await fetchReviewApi(props.id);
			return res;
		},
		onSuccess(res: FetchReviewFormResponse) {
			props.onComplete(res.data.reviewers);
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return fetchReview;
}

export default useFetchReviews;
