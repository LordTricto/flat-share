import {ReportHousemateForm, ReportHousemateFormResponse} from "./report-housemate.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {reportHousemateApi} from "./report-housemate-api";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {useDispatch} from "react-redux";

interface Props {
	onComplete: () => void;
}

function useReportHousemate(props: Props): UseMutationResult<any, unknown, ReportHousemateForm, unknown> {
	const dispatch = useDispatch();
	const reportHousemate = useMutation({
		mutationFn: async (_data: ReportHousemateForm) => {
			const res = await reportHousemateApi(_data);
			return res;
		},
		onSuccess(res: ReportHousemateFormResponse) {
			dispatch(setSuccessMessage(res.message));
			props.onComplete();
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return reportHousemate;
}

export default useReportHousemate;
