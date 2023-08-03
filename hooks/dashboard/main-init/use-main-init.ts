import {UseQueryResult, useQuery} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {MainInitFormResponse} from "./main-init.constants";
import {mainInitApi} from "./main-init-api";

// import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
// import {useDispatch} from "react-redux";

function useMainInit(): UseQueryResult<MainInitFormResponse, AxiosError<any, any>> {
	// const dispatch = useDispatch();
	const signIn = useQuery({
		queryKey: ["main-init"],
		refetchOnWindowFocus: false,
		retry: false,
		enabled: false, // disable this query from automatically running,
		queryFn: async () => {
			const res = await mainInitApi();
			return res;
		},
		onSuccess() {
			// dispatch(setSuccessMessage(data.message));
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return signIn;
}

export default useMainInit;
