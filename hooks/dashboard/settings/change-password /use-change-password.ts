import {ChangePasswordForm, ChangePasswordFormResponse} from "./change-password.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";

import Errorhandler from "@/helpers/useErrorHandler";
import {changePasswordApi} from "./change-password-api";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {useDispatch} from "react-redux";

function useChangePassword(props: () => void): UseMutationResult<any, unknown, ChangePasswordForm, unknown> {
	const dispatch = useDispatch();
	const changePassword = useMutation({
		mutationFn: async (_data: ChangePasswordForm) => {
			const res = await changePasswordApi(_data);
			return res;
		},
		onSuccess(data: ChangePasswordFormResponse) {
			dispatch(setSuccessMessage(data.message));
			props();
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
		// onSettled() {},
	});

	return changePassword;
}

export default useChangePassword;
