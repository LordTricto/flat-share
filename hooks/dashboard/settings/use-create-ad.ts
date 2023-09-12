import {CreateAdForm, CreateAdFormResponse} from "./settings.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {createAdApi} from "./create-ad-api";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {useDispatch} from "react-redux";

function useCreateAd(): UseMutationResult<any, unknown, CreateAdForm, unknown> {
	const dispatch = useDispatch();
	const signIn = useMutation({
		mutationFn: async (_data: CreateAdForm) => {
			const res = await createAdApi(_data);
			return res;
		},
		onSuccess(data: CreateAdFormResponse) {
			dispatch(setSuccessMessage(data.message));
			// dispatch(initSuccess({filter: data.filtered, user: data.user}));
			// dispatch(setToStageFour());
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return signIn;
}

export default useCreateAd;
