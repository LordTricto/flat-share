"use client";

import React, {useLayoutEffect, useState} from "react";

import {ClipLoader} from "react-spinners";
// import useInit from "@/hooks/dashboard/init/use-init";
import usePing from "@/hooks/dashboard/general/use-ping";

function InitLoader() {
	const [isHidden, setIsHidden] = useState(false);
	const handleOnSuccess = () => {
		setTimeout(() => setIsHidden(true), 1500);
	};
	const {initPing} = usePing({onFetched: handleOnSuccess});

	useLayoutEffect(() => {
		// initPing();
		initPing();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div
				className={
					`fixed left-0 top-0 z-[1000000] flex h-full w-full items-center justify-center bg-white ` +
					`${isHidden ? "pointer-events-none hidden opacity-0" : ""}`
				}
			>
				<ClipLoader color="#465BF1" speedMultiplier={1} loading />
			</div>
		</>
	);
}

export default InitLoader;
