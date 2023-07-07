import {UseMutationResult, UseQueryResult, useMutation, useQuery} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {logoutSuccess} from "@/redux/init/slice/initSlice";
import {logoutUserApi} from "./general-api";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";

function useLogout(): UseMutationResult<void, unknown, void, unknown> {
	const router = useRouter();
	const dispatch = useDispatch();

	const logoutUser = useMutation({
		mutationFn: async () => {
			const res = await logoutUserApi();
			return res;
		},
		onSuccess() {
			router.push("/sign-in");
			dispatch(logoutSuccess());
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return logoutUser;
}

export default useLogout;
