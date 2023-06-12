import {PayloadAction, createSlice} from "@reduxjs/toolkit";

import {ForgotPasswordState} from "./forgot-password-slice.type";

const initialState: ForgotPasswordState = {
	email: "",
};

export const forgotPasswordSlice = createSlice({
	name: "forgotPassword",
	initialState,
	reducers: {
		setForgotPasswordEmail: (state: ForgotPasswordState, action: PayloadAction<string>) => {
			state.email = action.payload;
		},

		resetForgotPassword: (state: ForgotPasswordState) => {
			state.email = "";
		},
	},
});

export const {setForgotPasswordEmail, resetForgotPassword} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
