import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {enableES5, enableMapSet} from "immer";

import Housemate from "@/models/housemate";
import {HousemateState} from "./housemateSlice.types";

enableES5();
enableMapSet();

const initialState: HousemateState = {
	housemates: new Map<string, Housemate>(),
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

		resetHousemate: (state: HousemateState) => {
			state.housemates.clear();
		},
	},
});

export const {
	setMultipleHousemates,
	setSingleHousemate,

	resetHousemate,
} = housemateSlice.actions;

export default housemateSlice.reducer;
