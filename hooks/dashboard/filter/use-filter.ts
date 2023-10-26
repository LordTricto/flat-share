import {FilterForm, FilterFormResponse} from "./filter.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {filterApi} from "./filter-api";
import {setUpdatedFilter} from "@/redux/init/slice/initSlice";
import {useDispatch} from "react-redux";

function useFilter(): UseMutationResult<FilterFormResponse, unknown, FilterForm, unknown> {
	const dispatch = useDispatch();
	const filter = useMutation({
		mutationFn: async (_data: FilterForm) => {
			const res = await filterApi(_data);
			return res;
		},
		onSuccess(data: FilterFormResponse) {
			// dispatch(setUpdatedFilter(data.filter));
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return filter;
}

export default useFilter;
