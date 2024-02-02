import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {setMultipleHousemates, setReceivedRequests, setSentRequests} from "@/redux/housemates/housemateSlice";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {MainInitFormResponse} from "./main-init.constants";
import {mainInitApi} from "./main-init-api";
// import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {useDispatch} from "react-redux";

function useMainInit(): UseQueryResult<MainInitFormResponse, AxiosError<any, any>> {
	const dispatch = useDispatch();
	const signIn = useQuery({
		queryKey: ["main-init"],
		refetchOnWindowFocus: false,
		retry: false,
		cacheTime: 0,
		staleTime: 0,
		enabled: false, // disable this query from automatically running,
		queryFn: async () => {
			const res = await mainInitApi();
			return res;
		},
		onSuccess(data: MainInitFormResponse) {
			dispatch(setMultipleHousemates(data.suggestions));
			dispatch(setSentRequests({sentRequests: data.sent_request.sent_request_data, sentRequestsNo: data.sent_request.sent_request_no}));
			dispatch(
				setReceivedRequests({
					receivedRequests: data.received_request.received_request_data,
					receivedRequestsNo: data.received_request.received_request_no,
				})
			);
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return signIn;
}

export default useMainInit;
