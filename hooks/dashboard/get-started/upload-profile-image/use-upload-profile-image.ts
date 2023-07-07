import {UploadProfileImageForm, UploadProfileImageFormResponse} from "./upload-profile-image.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {setToStageFour} from "@/redux/get-started/get-started";
import {uploadProfileImageApi} from "./upload-profile-image-api";
import {useDispatch} from "react-redux";

function useUploadProfileImage(handleSetImage: (_image: string) => void): UseMutationResult<any, unknown, UploadProfileImageForm, unknown> {
	const dispatch = useDispatch();
	const signIn = useMutation({
		mutationFn: async (_data: UploadProfileImageForm) => {
			const res = await uploadProfileImageApi(_data);
			return res;
		},
		onSuccess(data: UploadProfileImageFormResponse) {
			dispatch(setSuccessMessage(data.message));
			handleSetImage(data.user.profile_photo_path);
			// dispatch(initSuccess({filter: data.filtered, user: data.user}));
			dispatch(setToStageFour());
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return signIn;
}

export default useUploadProfileImage;
