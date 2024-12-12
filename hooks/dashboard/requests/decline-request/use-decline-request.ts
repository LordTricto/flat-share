import {DeclineRequestForm, DeclineRequestFormResponse} from "./decline-request.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {declineRequestApi} from "./decline-request-api";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {setUserStatistics} from "@/redux/init/slice/initSlice";
import {useDispatch} from "react-redux";

interface Props {
	onComplete?: () => void;
}

function useDeclineRequest(props?: Props): UseMutationResult<DeclineRequestFormResponse, unknown, DeclineRequestForm, unknown> {
	const dispatch = useDispatch();
	const declineRequest = useMutation({
		mutationFn: async (_data: DeclineRequestForm) => {
			const res = await declineRequestApi(_data);
			return res;
		},
		onSuccess(data: DeclineRequestFormResponse) {
			dispatch(setSuccessMessage(data.message));
			dispatch(setUserStatistics(data.statistics));
			props?.onComplete && props.onComplete();
		},
		onError(error: AxiosError) {
			console.log(error);
			Errorhandler(error);
		},
	});

	return declineRequest;
}

export default useDeclineRequest;
