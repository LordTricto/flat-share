import {GetStartedForm, GetStartedFormResponse} from "./get-started.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {getStartedApi} from "./get-started-api";
import {initSuccess} from "@/redux/init/slice/initSlice";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {setToStageFour} from "@/redux/get-started/get-started";
import {useDispatch} from "react-redux";

function useGetStarted(): UseMutationResult<any, unknown, GetStartedForm, unknown> {
	const dispatch = useDispatch();
	const signIn = useMutation({
		mutationFn: async (_data: GetStartedForm) => {
			const res = await getStartedApi(_data);
			return res;
		},
		onSuccess(data: GetStartedFormResponse) {
			dispatch(setSuccessMessage(data.message));
			dispatch(initSuccess({filter: data.filtered, user: data.user}));
			dispatch(setToStageFour());
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return signIn;
}

export default useGetStarted;