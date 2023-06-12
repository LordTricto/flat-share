import {ContactUsForm, ContactUsFormResponse} from "./contact-us.constants";
import {UseMutationResult, useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";

import Errorhandler from "@/helpers/useErrorHandler";
import {contactUsApi} from "./contact-us-api";
import {setSuccessMessage} from "@/redux/toast/slice/toast-slice";
import {useDispatch} from "react-redux";

function useContactUs(): UseMutationResult<any, unknown, ContactUsForm, unknown> {
	const dispatch = useDispatch();
	const contactUs = useMutation({
		mutationFn: async (_data: ContactUsForm) => {
			const res = await contactUsApi(_data);
			return res;
		},
		onSuccess(data: ContactUsFormResponse) {
			dispatch(setSuccessMessage(data.message));
		},
		onError(error: AxiosError) {
			Errorhandler(error);
		},
	});

	return contactUs;
}

export default useContactUs;
