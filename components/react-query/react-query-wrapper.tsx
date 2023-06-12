"use client";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React, {ReactNode} from "react";

const queryClient = new QueryClient();
function ReactQueryWrapper(props: {children: ReactNode}) {
	return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
}

export default ReactQueryWrapper;
