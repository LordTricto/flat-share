import {SendRequestForm, SendRequestFormResponse} from "./send-request.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {sendRequestApi} from "./send-request-api";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {useDispatch} from "react-redux";

interface Props {
	onComplete: () => void;
}

function useSendRequest(props: Props): UseMutationResult<SendRequestFormResponse, unknown, SendRequestForm, unknown> {
	const dispatch = useDispatch();
	const sendRequest = useMutation({
		mutationFn: async (_data: SendRequestForm) => {
			const res = await sendRequestApi(_data);
			return res;
		},
		onSuccess(data: SendRequestFormResponse) {
			dispatch(setSuccessMessage(data.message));
			props.onComplete();
		},
		onError(error: AxiosError) {
			console.log(error);
			Errorhandler(error);
		},
	});

	return sendRequest;
}

export default useSendRequest;
