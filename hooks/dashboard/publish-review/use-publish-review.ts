import {PublishReviewForm, PublishReviewFormResponse} from "./publish-review.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import Review from "@/models/review";
import {publishReviewApi} from "./publish-review-api";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {useDispatch} from "react-redux";

interface Props {
	onComplete: (_data: Review[]) => void;
}

function usePublishReview(props: Props): UseMutationResult<any, unknown, PublishReviewForm, unknown> {
	const dispatch = useDispatch();
	const signIn = useMutation({
		mutationFn: async (_data: PublishReviewForm) => {
			const res = await publishReviewApi(_data);
			return res;
		},
		onSuccess(res: PublishReviewFormResponse) {
			dispatch(setSuccessMessage(res.message));
			props.onComplete(res.data.reviewers);
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return signIn;
}

export default usePublishReview;
