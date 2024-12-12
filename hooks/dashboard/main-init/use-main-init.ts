import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {setUserRequests, setUserStatistics} from "@/redux/init/slice/initSlice";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {MainInitFormResponse} from "./main-init.constants";
import {mainInitApi} from "./main-init-api";
import {setMultipleHousemates} from "@/redux/housemates/housemateSlice";
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
			dispatch(
				setMultipleHousemates([...data.suggestions, ...data.received_request.received_request_data, ...data.sent_request.sent_request_data])
			);
			dispatch(setUserStatistics(data.user_statistics));
			dispatch(
				setUserRequests({
					sent_request: data.sent_request,
					received_request: data.received_request,
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
