import {UpdatePreferenceForm, UpdatePreferenceFormResponse} from "./update-preference.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {setUpdatedFilter} from "@/redux/init/slice/initSlice";
import {updatePreferenceApi} from "./update-preference-api";
import {useDispatch} from "react-redux";

function useUpdatePreference(props: () => void): UseMutationResult<any, unknown, UpdatePreferenceForm, unknown> {
	const dispatch = useDispatch();
	const preference = useMutation({
		mutationFn: async (_data: UpdatePreferenceForm) => {
			const res = await updatePreferenceApi(_data);
			return res;
		},
		onSuccess(data: UpdatePreferenceFormResponse) {
			dispatch(setSuccessMessage(data.message));
			dispatch(setUpdatedFilter(data.filter));
			props();
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return preference;
}

export default useUpdatePreference;
