"use client";

import React, {ReactNode} from "react";

import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {persistStore} from "redux-persist";
import store from "./store";

function ReduxProvider(props: {children: ReactNode}) {
	let persistor = persistStore(store);

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>{props.children}</PersistGate>
		</Provider>
	);
}

export default ReduxProvider;
