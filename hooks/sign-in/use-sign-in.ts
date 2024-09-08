import {SignInForm, SignInFormResponse} from "@/hooks/sign-in/sign-in.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";
import {initSuccess, loginSuccess} from "@/redux/init/slice/initSlice";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {setToStageOne} from "@/redux/get-started/get-started";
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
			dispatch(initSuccess({filter: data.filtered, user: data.user, interests: data.interests}));
			if (data.user.isGuest) {
				dispatch(setToStageOne());
				router.replace("/dashboard/get-started");
				return;
			} else {
				// router.replace("/dashboard/create-ad");
				router.push("/dashboard");
			}
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return signIn;
}

export default useSignIn;
