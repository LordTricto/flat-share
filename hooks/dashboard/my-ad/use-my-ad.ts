import {UseQueryResult, useQuery} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {MyADResponse} from "./my-ad.constants";
import {myAdApi} from "./my-ad-api";

function useMyAd(): UseQueryResult<MyADResponse, AxiosError<any, any>> {
	const myAd = useQuery({
		queryKey: ["my-ad"],
		refetchOnWindowFocus: false,
		retry: false,
		cacheTime: 0,
		staleTime: 0,
		enabled: false, // disable this query from automatically running,
		queryFn: async () => {
			const res = await myAdApi();
			return res;
		},
		onSuccess(data: MyADResponse) {
			console.log("object");
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return myAd;
}

export default useMyAd;
