import {CreateAdImagesForm, CreateAdImagesFormResponse} from "./settings.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {createAdImageApi} from "./create-ad-api";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {useDispatch} from "react-redux";

function useCreateAdImage(): UseMutationResult<any, unknown, CreateAdImagesForm, unknown> {
	const dispatch = useDispatch();
	const signIn = useMutation({
		mutationFn: async (_data: CreateAdImagesForm) => {
			const res = await createAdImageApi(_data);
			return res;
		},
		onSuccess(data: CreateAdImagesFormResponse) {
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

export default useCreateAdImage;
