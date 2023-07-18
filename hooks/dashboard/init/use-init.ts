import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {UserActivationStatus, UserType} from "@/models/user.constant";
import {initSuccess, setIsAccountCreatedStatus} from "@/redux/init/slice/initSlice";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {LoadUserDataFormResponse} from "./init.constants";
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
			if (data.user.account_status === UserActivationStatus.UNCOMPLETED || data.user.profile_photo_path.includes("default_avatar")) {
				dispatch(setIsAccountCreatedStatus(false));
				router.push("/dashboard/get-started");
			} else {
				if (data.user.account_status === UserActivationStatus.OFFLINE && data.user.user_type === UserType.HOST) {
					router.push("/dashboard/create-ad");
				} else {
					dispatch(setIsAccountCreatedStatus(true));
				}
			}
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return userData;
}

export default useInit;
