import {UpdatePlanForm, UpdatePlanFormResponse} from "./plan.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {updatePlanApi} from "./plan-api";
import {useDispatch} from "react-redux";

interface Props {
	onComplete?: () => void;
}

function useUpdatePlan(props?: Props): UseMutationResult<any, unknown, UpdatePlanForm, unknown> {
	const dispatch = useDispatch();

	const updatePlan = useMutation({
		mutationFn: async (_data: UpdatePlanForm) => {
			const res = await updatePlanApi(_data);
			return res;
		},
		onSuccess(data: UpdatePlanFormResponse) {
			dispatch(setSuccessMessage(data.message));
			props?.onComplete && props.onComplete();
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return updatePlan;
}

export default useUpdatePlan;
