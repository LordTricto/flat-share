"use client";

import {UseQueryResult, useQuery} from "@tanstack/react-query";
import {useCallback, useEffect, useRef} from "react";

import {AxiosError} from "axios";
import Errorhandler from "@/helpers/useErrorHandler";
import {KEEP_ALIVE_PING} from "./general.constants";
import {loginCheckApi} from "./general-api";
import {logoutSuccess} from "@/redux/init/slice/initSlice";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";

interface PingInterface {
	initPing: () => void;
}

function usePing(): PingInterface {
	const router = useRouter();
	const dispatch = useDispatch();

	const intervalRef = useRef<ReturnType<typeof setInterval>>();

	const loginCheck = useQuery({
		queryKey: ["pings"],
		queryFn: async () => {
			const res = await loginCheckApi();
			return res;
		},
		refetchOnWindowFocus: false,
		enabled: false, // disable this query from automatically running,
		onError(error: AxiosError) {
			// Errorhandler(error);
			// router.push("/sign-in");
			// dispatch(logoutSuccess());
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
