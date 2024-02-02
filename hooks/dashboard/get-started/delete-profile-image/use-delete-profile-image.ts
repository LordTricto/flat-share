import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import {DeleteProfileImageFormResponse} from "./delete-profile-image.constants";
import Errorhandler from "@/helpers/useErrorHandler";
import {deleteProfileImageApi} from "./delete-profile-image-api";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {setToStageFour} from "@/redux/get-started/get-started";
import {setUpdatedUserProfile} from "@/redux/init/slice/initSlice";
import {useDispatch} from "react-redux";

function useDeleteProfileImage(): UseMutationResult<any, unknown, void, unknown> {
	const dispatch = useDispatch();
	const signIn = useMutation({
		mutationFn: async () => {
			const res = await deleteProfileImageApi();
			return res;
		},
		onSuccess(data: DeleteProfileImageFormResponse) {
			dispatch(setSuccessMessage(data.message));
			dispatch(setUpdatedUserProfile(data.user));
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return signIn;
}

export default useDeleteProfileImage;
