import {UseQueryResult, useQuery} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {ViewsFormResponse} from "./views.constants";
import {setViews} from "@/redux/views/viewsSlice";
import {useDispatch} from "react-redux";
import {viewsApi} from "./views-api";

function useViews(): UseQueryResult<ViewsFormResponse, AxiosError<any, any>> {
	const dispatch = useDispatch();
	const signIn = useQuery({
		queryKey: ["views"],
		refetchOnWindowFocus: false,
		retry: false,
		cacheTime: 0,
		staleTime: 0,
		enabled: false, // disable this query from automatically running,
		queryFn: async () => {
			const res = await viewsApi();
			return res;
		},
		onSuccess(data: ViewsFormResponse) {
			dispatch(setViews(data));
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return signIn;
}

export default useViews;
