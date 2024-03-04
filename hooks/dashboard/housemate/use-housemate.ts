import {UseQueryResult, useQuery} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {HousemateResponse} from "./housemate.constants";
import {housemateApi} from "./housemate-api";
import {initLoadingFalse} from "@/redux/init/slice/initSlice";
import {useDispatch} from "react-redux";

interface Props {
	id: string;
}

function useHousemate(props: Props): UseQueryResult<HousemateResponse, AxiosError<any, any>> {
	const dispatch = useDispatch();

	const housemateData = useQuery({
		queryKey: ["housemate"],
		refetchOnWindowFocus: false,
		cacheTime: 0,
		refetchOnMount: false,
		retryOnMount: false,
		retry: false,
		enabled: false, // disable this query from automatically running,
		queryFn: async () => {
			const res = await housemateApi(props.id);
			return res;
		},
		onError(error: AxiosError) {
			Errorhandler(error);
			dispatch(initLoadingFalse());
		},
	});

	return housemateData;
}

export default useHousemate;
