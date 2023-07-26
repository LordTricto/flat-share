"use client";

import axios, {AxiosError} from "axios";
import {useCallback, useEffect, useRef} from "react";
import {usePathname, useRouter} from "next/navigation";

import {ErrorMessage} from "@/helpers/request/makeRequest";
import Errorhandler from "@/helpers/useErrorHandler";
import {KEEP_ALIVE_PING} from "./general.constants";
import {loginCheckApi} from "./general-api";
import {loginSuccess} from "@/redux/init/slice/initSlice";
import {useDispatch} from "react-redux";
import {useQuery} from "@tanstack/react-query";

interface PingInterface {
	initPing: () => void;
}
interface Props {
	onFetched: () => void;
}

function usePing(props: Props): PingInterface {
	const router = useRouter();
	const dispatch = useDispatch();
	const pathname = usePathname();

	const intervalRef = useRef<ReturnType<typeof setInterval>>();

	const loginCheck = useQuery({
		queryKey: ["pings"],
		queryFn: async () => {
			const res = await loginCheckApi();
			return res;
		},
		retry: 2,
		refetchOnWindowFocus: false,
		enabled: false, // disable this query from automatically running,
		onSuccess() {
			dispatch(loginSuccess());
			if (!pathname.includes("dashboard")) {
				router.replace("/dashboard");
			}
		},
		onError(error: AxiosError) {
			Errorhandler(error);
			if (error.message === ErrorMessage.UNAUTHORIZED_ERROR && pathname.includes("dashboard")) {
				router.replace("/sign-in");
			}
		},
		onSettled() {
			props.onFetched();
		},
	});

	const pingHandler = useCallback(() => {
		loginCheck.refetch();
	}, [loginCheck]);

	const initPing = useCallback(() => {
		pingHandler();
		intervalRef.current = setInterval(pingHandler, KEEP_ALIVE_PING * 60 * 1000);
	}, [pingHandler]);

	// clear interval on unmount
	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	return {initPing};
}

export default usePing;
