import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {initLoadingFalse, initRequest, initSuccess, setIsAccountCreatedStatus} from "@/redux/init/slice/initSlice";
import {usePathname, useRouter} from "next/navigation";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {LoadUserDataFormResponse} from "./init.constants";
import {UserActivationStatus} from "@/models/user.constant";
import {loadUserDataApi} from "./init-api";
import {setToStageOne} from "@/redux/get-started/get-started";
import {useDispatch} from "react-redux";

function useInit(): UseQueryResult<LoadUserDataFormResponse, AxiosError<any, any>> {
	const dispatch = useDispatch();
	const router = useRouter();
	const pathname = usePathname();

	// const redirect = (_data: UserActivationStatus) => {
	// 	if (_data === UserActivationStatus.UNCOMPLETED) {
	// 		dispatch(setToStageOne());
	// 		router.replace("/dashboard/get-started");
	// 	} else {
	// 		router.replace("/dashboard");
	// 	}
	// };

	const userData = useQuery({
		queryKey: ["user"],
		refetchOnWindowFocus: false,
		retry: false,
		enabled: false, // disable this query from automatically running,
		queryFn: async () => {
			dispatch(initRequest());
			const res = await loadUserDataApi();
			return res;
		},
		onSuccess(data) {
			dispatch(initSuccess({filter: data.filtered, user: data.user}));
			// if they are not on the dashboard take them to the Dashboard but also check if they are registered or not
			// if they are on the dashboard but they are not done with setup take them back to complete the dashboard
			if (!pathname.includes("dashboard")) {
				if (
					(data.user.account_status === UserActivationStatus.UNCOMPLETED || data.user.account_status === UserActivationStatus.ONLINE) &&
					data.user.profile_photo_path.includes("default")
				) {
					dispatch(setToStageOne());
					dispatch(setIsAccountCreatedStatus(false));
					router.replace("/dashboard/get-started");
				} else {
					dispatch(setIsAccountCreatedStatus(true));
					router.replace("/dashboard");
				}
			} else {
				if (
					(data.user.account_status === UserActivationStatus.UNCOMPLETED || data.user.account_status === UserActivationStatus.ONLINE) &&
					data.user.profile_photo_path.includes("default")
				) {
					dispatch(setToStageOne());
					dispatch(setIsAccountCreatedStatus(false));
					router.replace("/dashboard/get-started");
				} else {
					dispatch(setIsAccountCreatedStatus(true));
				}
			}
		},
		onError(error: AxiosError) {
			Errorhandler(error);
			dispatch(initLoadingFalse());
		},
		// onSettled() {
		// props.onCompleted && props.onCompleted();
		// },
	});

	return userData;
}

export default useInit;

// if (!pathname.includes("dashboard")) {
// 	router.replace("/dashboard");
// } else if (data.user.account_status === UserActivationStatus.UNCOMPLETED && data.user.profile_photo_path.includes("default")) {
// 	dispatch(setIsAccountCreatedStatus(false));
// 	router.push("/dashboard/get-started");
// } else if (data.user.account_status === UserActivationStatus.ONLINE && data.user.profile_photo_path.includes("default")) {
// 	dispatch(setIsAccountCreatedStatus(false));
// 	dispatch(setToStageFour());
// 	router.push("/dashboard/get-started");
// } else if (data.user.account_status === UserActivationStatus.OFFLINE && data.user.user_type === UserType.HOST) {
// 	dispatch(setIsAccountCreatedStatus(false));
// 	router.push("/dashboard/create-ad");
// } else {
// 	dispatch(setIsAccountCreatedStatus(true));
// }
