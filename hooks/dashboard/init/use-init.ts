import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {initLoadingFalse, initRequest, initSuccess, setInitSignals} from "@/redux/init/slice/initSlice";
import {setMultipleHousemates, setReceivedRequests, setSentRequests} from "@/redux/housemates/housemateSlice";
import {usePathname, useRouter} from "next/navigation";

import {AccountSignals, HostSignals} from "@/redux/init/slice/initSlice.types";
import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {MainInitFormResponse} from "../main-init/main-init.constants";
import {mainInitApi} from "../main-init/main-init-api";
import {setToStageOne} from "@/redux/get-started/get-started";
import {useDispatch} from "react-redux";

function useInit(): UseQueryResult<MainInitFormResponse, AxiosError<any, any>> {
	const router = useRouter();
	const dispatch = useDispatch();
	const pathname = usePathname();

	const userData = useQuery({
		queryKey: ["init"],
		refetchOnWindowFocus: false,
		retry: false,
		enabled: false, // disable this query from automatically running,
		queryFn: async () => {
			dispatch(initRequest());
			const res = await mainInitApi();
			return res;
		},
		onSuccess(data: MainInitFormResponse) {
			dispatch(setInitSignals({accountSignal: data.signal, hostSignal: data.host_property_signal}));

			dispatch(initSuccess({user: data.user, filter: data.filter, interests: data.interests}));

			dispatch(setMultipleHousemates(data.suggestions));
			dispatch(setSentRequests({sentRequests: data.sent_request.sent_request_data, sentRequestsNo: data.sent_request.sent_request_no}));
			dispatch(
				setReceivedRequests({
					receivedRequests: data.received_request.received_request_data,
					receivedRequestsNo: data.received_request.received_request_no,
				})
			);

			if (data.user.isGuest && data.signal === AccountSignals.SETUP_UNCOMPLETED) {
				dispatch(setToStageOne());
				router.replace("/dashboard/get-started");
			}
			if(data.user.isHost && (data.host_property_signal ===HostSignals.NO_PROPERTY|| data.host_property_signal ===HostSignals.UNPAID_PROPERTY_ADS_FEE)){
				router.replace("/dashboard/create-ad");
			}

			if (!pathname.includes("dashboard")) router.replace("/dashboard");
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
