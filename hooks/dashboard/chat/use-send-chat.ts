import {SendChatForm, SendChatResponse} from "./chat-api.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {sendChatApi} from "./chat-api";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {useDispatch} from "react-redux";

interface Props {
	onComplete?: () => void;
}

function useSendChat(props?: Props): UseMutationResult<any, unknown, SendChatForm, unknown> {
	const dispatch = useDispatch();

	const sendChat = useMutation({
		mutationFn: async (_data: SendChatForm) => {
			const res = await sendChatApi(_data);
			return res;
		},
		onSuccess(data: SendChatResponse) {
			console.log(data);
			dispatch(setSuccessMessage(data.message));
			props?.onComplete && props.onComplete();
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return sendChat;
}

export default useSendChat;
