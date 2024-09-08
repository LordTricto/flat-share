import {UseMutationResult, useMutation} from "@tanstack/react-query";
import {initReset, logoutSuccess} from "@/redux/init/slice/initSlice";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {applicationReset} from "@/redux/get-started/get-started";
import {logoutUserApi} from "./general-api";
import {resetHousemate} from "@/redux/housemates/housemateSlice";
import {resetToken} from "@/redux/token/slice/tokenSlice";
import {resetViews} from "@/redux/views/viewsSlice";
import {toastReset} from "@/redux/toast/slice/toast-slice";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";

function useLogout(): UseMutationResult<void, unknown, void, unknown> {
	const router = useRouter();
	const dispatch = useDispatch();

	const logoutUser = useMutation({
		mutationFn: async () => {
			const res = await logoutUserApi();
			return res;
		},
		onSuccess() {
			router.push("/sign-in");
			setTimeout(() => {
				dispatch(initReset());
				dispatch(resetViews());
				dispatch(toastReset());
				dispatch(resetToken());
				dispatch(logoutSuccess());
				dispatch(resetHousemate());
				dispatch(applicationReset());
			}, 1500);
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return logoutUser;
}

export default useLogout;
