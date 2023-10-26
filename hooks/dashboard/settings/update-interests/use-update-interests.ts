import {UpdateInterestsForm, UpdateInterestsFormResponse} from "./update-interests.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {setUpdatedInterests} from "@/redux/init/slice/initSlice";
import {updateInterestsApi} from "./update-interests-api";
import {useDispatch} from "react-redux";

function useUpdateInterests(props: () => void): UseMutationResult<any, unknown, UpdateInterestsForm, unknown> {
	const dispatch = useDispatch();
	const signIn = useMutation({
		mutationFn: async (_data: UpdateInterestsForm) => {
			const res = await updateInterestsApi(_data);
			return res;
		},
		onSuccess(data: UpdateInterestsFormResponse) {
			dispatch(setSuccessMessage(data.message));
			dispatch(setUpdatedInterests(data.interests));
			props();
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return signIn;
}

export default useUpdateInterests;
