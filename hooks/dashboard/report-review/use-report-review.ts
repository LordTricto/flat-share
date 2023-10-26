import {ReportReviewForm, ReportReviewFormResponse} from "./report-review.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import Review from "@/models/review";
import {reportReviewApi} from "./report-review-api";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {useDispatch} from "react-redux";

interface Props {
	onComplete: () => void;
}

function useReportReview(props: Props): UseMutationResult<any, unknown, ReportReviewForm, unknown> {
	const dispatch = useDispatch();
	const signIn = useMutation({
		mutationFn: async (_data: ReportReviewForm) => {
			const res = await reportReviewApi(_data);
			return res;
		},
		onSuccess(res: ReportReviewFormResponse) {
			dispatch(setSuccessMessage(res.message));
			props.onComplete();
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return signIn;
}

export default useReportReview;
