import {PayloadAction, createSlice} from "@reduxjs/toolkit";

import {TokenState} from "./tokenSlice.types";

const initialState: TokenState = {
	token: null,
};

export const tokenSlice = createSlice({
	name: "token",
	initialState,
	reducers: {
		setToken: (state: TokenState, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		resetToken: (state: TokenState) => {
			state.token = null;
		},
	},
});

export const {setToken, resetToken} = tokenSlice.actions;

export default tokenSlice.reducer;
