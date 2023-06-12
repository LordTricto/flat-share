"use client";

import React, {ReactNode} from "react";

import {Provider} from "react-redux";
import store from "./store";

function ReduxProvider(props: {children: ReactNode}) {
	return <Provider store={store}>{props.children}</Provider>;
}

export default ReduxProvider;
