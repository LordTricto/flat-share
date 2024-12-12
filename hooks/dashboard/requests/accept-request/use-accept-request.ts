import {AcceptRequestForm, AcceptRequestFormResponse} from "./accept-request.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {acceptRequestApi} from "./accept-request-api";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {useDispatch} from "react-redux";

interface Props {
	onComplete?: () => void;
}

function useAcceptRequest(props?: Props): UseMutationResult<AcceptRequestFormResponse, unknown, AcceptRequestForm, unknown> {
	const dispatch = useDispatch();
	const acceptRequest = useMutation({
		mutationFn: async (_data: AcceptRequestForm) => {
			const res = await acceptRequestApi(_data);
			return res;
		},
		onSuccess(data: AcceptRequestFormResponse) {
			dispatch(setSuccessMessage(data.message));
			props?.onComplete && props.onComplete();
		},
		onError(error: AxiosError) {
			console.log(error);
			Errorhandler(error);
		},
	});

	return acceptRequest;
}

export default useAcceptRequest;
