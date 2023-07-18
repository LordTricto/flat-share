import {SignUpForm, SignUpFormResponse} from "./sign-up.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {signUpApi} from "./sign-up-api";
import {useDispatch} from "react-redux";

function useSignUp(): UseMutationResult<any, unknown, SignUpForm, unknown> {
	const dispatch = useDispatch();
	const signUp = useMutation({
		mutationFn: async (_data: SignUpForm) => {
			const res = await signUpApi(_data);
			return res;
		},
		onSuccess(data: SignUpFormResponse) {
			dispatch(setSuccessMessage(data.message));
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return signUp;
}

export default useSignUp;
