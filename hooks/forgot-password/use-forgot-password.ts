import {UseMutationResult, useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";

import Errorhandler from "@/helpers/useErrorHandler";
import {ForgotPasswordForm} from "./forgot-password.constants";
import {forgotPasswordApi} from "./forgot-password-api";
import {setForgotPasswordEmail} from "@/redux/forgot-password/slice/forgot-password-slice";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";

function useForgotPassword(): UseMutationResult<any, unknown, ForgotPasswordForm, unknown> {
	const dispatch = useDispatch();
	const router = useRouter();

	const forgotPassword = useMutation({
		mutationFn: async (_data: ForgotPasswordForm) => {
			const res = await forgotPasswordApi(_data);
			return res;
		},

		onSuccess(data, variables: ForgotPasswordForm) {
			// something
			dispatch(setForgotPasswordEmail(variables.email));
			dispatch(setSuccessMessage(data.message));
			router.push("/forgot-password/check");
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
		// onSettled() {},
	});

	return forgotPassword;
}

export default useForgotPassword;
