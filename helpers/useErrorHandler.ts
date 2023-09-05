import axios, {AxiosError} from "axios";

import {ErrorMessage} from "./request/makeRequest";
import {RequestCancelledError} from "./request/requestErrors";
import {logoutSuccess} from "@/redux/init/slice/initSlice";
import {resetToken} from "@/redux/token/slice/tokenSlice";
import {setErrorMessage} from "@/redux/toast/slice/toast-slice";
import store from "@/redux/store";

// import {useRouter} from "next/navigation";

export default function Errorhandler(err: AxiosError): void {
	// const router = useRouter();
	const axiosError = err as AxiosError;
	const errorMessage: string | Record<string, unknown> = axiosError.response?.data.data || axiosError.response?.data.message || err.message || "";

	if (errorMessage === ErrorMessage.UNAUTHORIZED_ERROR) {
		console.log("Unauthorized");
		store.dispatch(resetToken());
		store.dispatch(logoutSuccess());
		// router.push("/sign-in");
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
