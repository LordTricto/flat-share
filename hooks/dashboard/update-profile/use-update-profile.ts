import {UpdateProfileForm, UpdateProfileFormResponse} from "./update-profile.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {initSuccess} from "@/redux/init/slice/initSlice";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {setToStageFour} from "@/redux/get-started/get-started";
import {updateProfileApi} from "./update-profile-api";
import {useDispatch} from "react-redux";

function useUpdateProfile(): UseMutationResult<any, unknown, UpdateProfileForm, unknown> {
	const dispatch = useDispatch();
	const signIn = useMutation({
		mutationFn: async (_data: UpdateProfileForm) => {
			const res = await updateProfileApi(_data);
			return res;
		},
		onSuccess(data: UpdateProfileFormResponse) {
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

export default useUpdateProfile;
