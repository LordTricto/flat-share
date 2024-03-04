import {OtherPersonalDetailsForm, PersonalDetailsForm} from "../settings/settings.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {UpdateProfileFormResponse} from "./update-profile.constants";
import {initSuccess} from "@/redux/init/slice/initSlice";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {updateProfileApi} from "./update-profile-api";
import {useDispatch} from "react-redux";

function useUpdateProfile(props: () => void): UseMutationResult<any, unknown, PersonalDetailsForm & OtherPersonalDetailsForm, unknown> {
	const dispatch = useDispatch();
	const signIn = useMutation({
		mutationFn: async (_data: PersonalDetailsForm & OtherPersonalDetailsForm) => {
			const res = await updateProfileApi(_data);
			return res;
		},
		onSuccess(data: UpdateProfileFormResponse) {
			dispatch(setSuccessMessage(data.message));
			dispatch(initSuccess({filter: data.filtered, user: data.user, interests: data.interests}));
			props();
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return signIn;
}

export default useUpdateProfile;
