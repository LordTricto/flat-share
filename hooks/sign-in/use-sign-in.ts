import {SignInForm, SignInFormResponse} from "@/hooks/sign-in/sign-in.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";
import {UserActivationStatus, UserType} from "@/models/user.constant";
import axios, {AxiosError} from "axios";
import {initSuccess, loginSuccess, setIsAccountCreatedStatus} from "@/redux/init/slice/initSlice";
import {setToStageFour, setToStageOne} from "@/redux/get-started/get-started";

import Errorhandler from "@/helpers/useErrorHandler";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {setToken} from "@/redux/token/slice/tokenSlice";
import {signInApi} from "./sign-in-api";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";

function useSignIn(): UseMutationResult<any, unknown, SignInForm, unknown> {
	const router = useRouter();
	const dispatch = useDispatch();
	const signIn = useMutation({
		mutationFn: async (_data: SignInForm) => {
			const res = await signInApi(_data);
			return res;
		},
		onSuccess(data: SignInFormResponse) {
			dispatch(setSuccessMessage(data.message));
			dispatch(setToken(data.token));
			dispatch(loginSuccess());
			dispatch(initSuccess({filter: data.filtered, user: data.user}));
			if (data.user.account_status === UserActivationStatus.UNCOMPLETED && data.user.profile_photo_path.includes("default")) {
				dispatch(setIsAccountCreatedStatus(false));
				dispatch(setToStageOne());
				router.replace("/dashboard/get-started");
				return;
			}
			if (data.user.account_status === UserActivationStatus.ONLINE && data.user.profile_photo_path.includes("default")) {
				dispatch(setIsAccountCreatedStatus(false));
				dispatch(setToStageOne());
				router.replace("/dashboard/get-started");
				return;
			}
			if (data.user.account_status === UserActivationStatus.OFFLINE && data.user.user_type === UserType.HOST) {
				router.replace("/dashboard/create-ad");
				dispatch(setIsAccountCreatedStatus(false));
				return;
			}
			router.push("/dashboard");
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return signIn;
}

export default useSignIn;
