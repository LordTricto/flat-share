import {GetStartedForm, GetStartedFormResponse} from "../get-started/account-setup/get-started.constants";
// import {GetStartedForm, GetStartedFormResponse} from "./create-ad.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {getStartedApi} from "./create-ad-api";
import {initSuccess} from "@/redux/init/slice/initSlice";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {setToStageFour} from "@/redux/get-started/get-started";
import {useDispatch} from "react-redux";

function useCreateAd(): UseMutationResult<any, unknown, GetStartedForm, unknown> {
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

export default useCreateAd;
