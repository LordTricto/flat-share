import {GetStartedForm, GetStartedFormResponse} from "./get-started.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";
import {initSuccess, setIsAccountCreatedStatus} from "@/redux/init/slice/initSlice";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {getStartedApi} from "./get-started-api";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";

function useGetStarted(): UseMutationResult<any, unknown, GetStartedForm, unknown> {
	const dispatch = useDispatch();
	const router = useRouter();

	const signIn = useMutation({
		mutationFn: async (_data: GetStartedForm) => {
			const res = await getStartedApi(_data);
			return res;
		},
		onSuccess(data: GetStartedFormResponse) {
			dispatch(setSuccessMessage(data.message));
			dispatch(initSuccess({filter: data.filter, user: data.user, interests: data.interests}));
			dispatch(setIsAccountCreatedStatus(true));
			router.push("/dashboard");
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return signIn;
}

export default useGetStarted;
