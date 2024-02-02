import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {enableES5, enableMapSet} from "immer";

import Housemate from "@/models/housemate";
import {HousemateState} from "./housemateSlice.types";

enableES5();
enableMapSet();

const initialState: HousemateState = {
	housemates: new Map<string, Housemate>(),
	requests: {
		sentRequest: [],
		sentRequestsNo: 0,
		receivedRequest: [],
		receivedRequestsNo: 0,
	},
};

export const housemateSlice = createSlice({
	name: "housemate",
	initialState,
	reducers: {
		setMultipleHousemates: (state: HousemateState, action: PayloadAction<Housemate[]>) => {
			action.payload.forEach((t) =>
				t.codec
					? state.housemates.set(
							`${t.codec
								.split("")
								.filter((_) => _ !== "=")
								.join("")}`,
							t
					  )
					: undefined
			);
		},

		setSingleHousemate: (state: HousemateState, action: PayloadAction<Housemate>) => {
			if (action.payload.codec) state.housemates.set(action.payload.codec, action.payload);
		},
		setSentRequests: (state: HousemateState, action: PayloadAction<{sentRequestsNo: number; sentRequests: Housemate[]}>) => {
			state.requests.sentRequest = action.payload.sentRequests;
			state.requests.sentRequestsNo = action.payload.sentRequestsNo;
		},
		setReceivedRequests: (state: HousemateState, action: PayloadAction<{receivedRequestsNo: number; receivedRequests: Housemate[]}>) => {
			state.requests.receivedRequest = action.payload.receivedRequests;
			state.requests.receivedRequestsNo = action.payload.receivedRequestsNo;
		},

		resetHousemate: (state: HousemateState) => {
			state.housemates.clear();
		},
	},
});

export const {
	setMultipleHousemates,
	setSingleHousemate,
	setSentRequests,
	setReceivedRequests,

	resetHousemate,
} = housemateSlice.actions;

export default housemateSlice.reducer;
