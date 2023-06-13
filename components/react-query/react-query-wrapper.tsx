"use client";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React, {ReactNode, useEffect, useRef} from "react";
import LoadingBar from "react-top-loading-bar";
import {LoadingBarRef} from "react-top-loading-bar";
import {usePathname} from "next/navigation";

const queryClient = new QueryClient();

function ReactQueryWrapper(props: {children: ReactNode}) {
	const pathname = usePathname();

	const ref = useRef<LoadingBarRef | null>(null);

	useEffect(() => {
		ref.current?.complete();
	}, [pathname]);

	return (
		<QueryClientProvider client={queryClient}>
			<LoadingBar color="#465BF1" ref={ref} />
			{props.children}
		</QueryClientProvider>
	);
}

export default ReactQueryWrapper;
