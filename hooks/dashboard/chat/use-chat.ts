import {UseQueryResult, useQuery} from "@tanstack/react-query";

import {AxiosError} from "axios";
import {ChatsResponse} from "./chat-api.constants";
import Errorhandler from "@/helpers/useErrorHandler";
import {chatsApi} from "./chat-api";

// import {setMultipleHousemates} from "@/redux/housemates/housemateSlice";
// import {useDispatch} from "react-redux";

interface Props {
	onComplete?: () => void;
}
function useChat(props?: Props): UseQueryResult<ChatsResponse, AxiosError<any, any>> {
	// const dispatch = useDispatch();

	const signIn = useQuery({
		queryKey: ["chats"],
		refetchOnWindowFocus: false,
		retry: false,
		cacheTime: 0,
		staleTime: 0,
		enabled: false, // disable this query from automatically running,
		queryFn: async () => {
			const res = await chatsApi();
			return res;
		},
		onSuccess(data: ChatsResponse) {
			console.log(data);
			props?.onComplete && props.onComplete();
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return signIn;
}

export default useChat;
