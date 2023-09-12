import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {UserActivationStatus, UserType} from "@/models/user.constant";
import {initLoadingFalse, initRequest, initSuccess, setIsAccountCreatedStatus} from "@/redux/init/slice/initSlice";
import {setToStageFour, setToStageOne} from "@/redux/get-started/get-started";
import {usePathname, useRouter} from "next/navigation";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {LoadUserDataFormResponse} from "./init.constants";
import {loadUserDataApi} from "./init-api";
import {useDispatch} from "react-redux";

function useInit(): UseQueryResult<LoadUserDataFormResponse, AxiosError<any, any>> {
	const dispatch = useDispatch();
	const router = useRouter();
	const pathname = usePathname();

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

			dispatch(setIsAccountCreatedStatus(true));

			if (!pathname.includes("dashboard")) {
				router.replace("/dashboard");
				return;
			}
			// if (data.user.account_status === UserActivationStatus.UNCOMPLETED && data.user.profile_photo_path.includes("default")) {
			// 	dispatch(setIsAccountCreatedStatus(false));
			// 	dispatch(setToStageOne());
			// 	router.replace("/dashboard/get-started");
			// 	return;
			// }
			// if (data.user.account_status === UserActivationStatus.ONLINE && data.user.profile_photo_path.includes("default")) {
			// 	dispatch(setIsAccountCreatedStatus(false));
			// 	dispatch(setToStageFour());
			// 	router.replace("/dashboard/get-started");
			// 	return;
			// }
			// if (data.user.account_status === UserActivationStatus.OFFLINE && data.user.user_type === UserType.HOST) {
			// 	router.replace("/dashboard/create-ad");
			// 	dispatch(setIsAccountCreatedStatus(false));
			// 	return;
			// }
			// dispatch(setIsAccountCreatedStatus(true));
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
