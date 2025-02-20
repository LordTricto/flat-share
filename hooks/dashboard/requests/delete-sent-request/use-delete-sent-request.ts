import {DeleteSentRequestForm, DeleteSentRequestFormResponse} from "./delete-sent-request.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {deleteSentRequestApi} from "./delete-sent-request-api";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {setUserStatistics} from "@/redux/init/slice/initSlice";
import {useDispatch} from "react-redux";

interface Props {
	onComplete: () => void;
}

function useDeleteSentRequest(props?: Props): UseMutationResult<DeleteSentRequestFormResponse, unknown, DeleteSentRequestForm, unknown> {
	const dispatch = useDispatch();
	const deleteSentRequest = useMutation({
		mutationFn: async (_data: DeleteSentRequestForm) => {
			const res = await deleteSentRequestApi(_data);
			return res;
		},
		onSuccess(data: DeleteSentRequestFormResponse) {
			dispatch(setSuccessMessage(data.message));
			dispatch(setUserStatistics(data.statistics));
			props?.onComplete && props.onComplete();
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return deleteSentRequest;
}

export default useDeleteSentRequest;
