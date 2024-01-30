import {ExploreFilterForm, ExploreFilterFormResponse} from "./explore.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {filterApi} from "./explore-api";
import {setUpdatedFilter} from "@/redux/init/slice/initSlice";
import {useDispatch} from "react-redux";

function useExplore(): UseMutationResult<ExploreFilterFormResponse, unknown, ExploreFilterForm, unknown> {
	const dispatch = useDispatch();
	const filter = useMutation({
		mutationFn: async (_data: ExploreFilterForm) => {
			const res = await filterApi(_data);
			return res;
		},
		onSuccess(data: ExploreFilterFormResponse) {
			// dispatch(setUpdatedFilter(data.filter));
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return filter;
}

export default useExplore;
