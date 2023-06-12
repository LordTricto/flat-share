import {SignInForm, SignInFormResponse} from "@/hooks/sign-in/sign-in.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {initSuccess, loginSuccess} from "@/redux/init/slice/initSlice";

import Errorhandler from "@/helpers/useErrorHandler";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
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
			dispatch(loginSuccess(data.token));
			dispatch(initSuccess({filter: data.filtered, user: data.user}));
			router.push("/dashboard");
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return signIn;
}

export default useSignIn;
