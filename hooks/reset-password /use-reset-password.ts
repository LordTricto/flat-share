import {ResetPasswordForm, ResetPasswordFormResponse} from "./reset-password.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";

import Errorhandler from "@/helpers/useErrorHandler";
import {resetPasswordApi} from "./reset-password-api";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {useDispatch} from "react-redux";

function useResetPassword(): UseMutationResult<any, unknown, ResetPasswordForm, unknown> {
	const dispatch = useDispatch();
	const resetPassword = useMutation({
		mutationFn: async (_data: ResetPasswordForm) => {
			const res = await resetPasswordApi(_data);
			return res;
		},
		onSuccess(data: ResetPasswordFormResponse) {
			dispatch(setSuccessMessage(data.message));
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
		// onSettled() {},
	});

	return resetPassword;
}

export default useResetPassword;
