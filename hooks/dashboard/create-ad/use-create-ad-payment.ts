import {CreateAdPaymentForm, CreateAdPaymentFormResponse} from "./create-ad.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {createAdPaymentApi} from "./create-ad-api";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {useDispatch} from "react-redux";

interface Props {
	onComplete: () => void;
}

function useCreateAdPayment(props: Props): UseMutationResult<any, unknown, CreateAdPaymentForm, unknown> {
	const dispatch = useDispatch();
	const signIn = useMutation({
		mutationFn: async (_data: CreateAdPaymentForm) => {
			const res = await createAdPaymentApi(_data);
			return res;
		},
		onSuccess(data: CreateAdPaymentFormResponse) {
			dispatch(setSuccessMessage(data.message));
			props.onComplete();
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return signIn;
}

export default useCreateAdPayment;
