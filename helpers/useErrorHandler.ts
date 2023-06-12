import axios, {AxiosError} from "axios";

import {ErrorMessage} from "./request/makeRequest";
import {GenericObject} from "./types";
import {RequestCancelledError} from "./request/requestErrors";
import {setErrorMessage} from "@/redux/toast/slice/toast-slice";
import store from "@/redux/store";

export default function Errorhandler(err: AxiosError): void {
	if (axios.isAxiosError(err)) {
		const axiosError = err as AxiosError;
		const errorMessage: string = axiosError.response?.data.message || "";

		console.log(errorMessage);
		if (errorMessage === ErrorMessage.UNAUTHORIZED_ERROR && store.getState().init.isLoggedIn) {
			console.log("Unauthorized");
			// return handleLogout();
			return;
		}
		// does nothing if error is a cancel message
		if (errorMessage === ErrorMessage.AXIOS_CANCEL_ERROR || err instanceof RequestCancelledError) {
			return;
		}

		if (typeof errorMessage !== "string") {
			Object.values(errorMessage).forEach((_errors) => (_errors as string[]).forEach((_error) => store.dispatch(setErrorMessage(_error))));
			return;
		}

		store.dispatch(setErrorMessage(errorMessage));
	}
}
