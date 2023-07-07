import {UseQueryResult, useQuery} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {LoadUserDataFormResponse} from "./init.constants";
import {UserActivationStatus} from "@/models/user.constant";
import {initSuccess} from "@/redux/init/slice/initSlice";
import {loadUserDataApi} from "./init-api";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";

function useInit(): UseQueryResult<LoadUserDataFormResponse, AxiosError<any, any>> {
	const dispatch = useDispatch();
	const router = useRouter();
	const userData = useQuery({
		queryKey: ["user"],
		refetchOnWindowFocus: false,
		retry: false,
		enabled: false, // disable this query from automatically running,
		queryFn: async () => {
			const res = await loadUserDataApi();
			return res;
		},
		onSuccess(data) {
			dispatch(initSuccess({filter: data.filtered, user: data.user}));
			if (data.user.account_status === UserActivationStatus.UNCOMPLETED) {
				router.push("/dashboard/get-started");
			}
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return userData;
}

export default useInit;
