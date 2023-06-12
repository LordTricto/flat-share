import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {ToastItemType, ToastMessageType} from "@/components/toast/toast.constant";

import {ToastState} from "./toast.types";

const initialState: ToastState = {
	toastItems: [],
};

export const toastSlice = createSlice({
	name: "toast",
	initialState,
	reducers: {
		setErrorMessage: (state: ToastState, action: PayloadAction<string>) => {
			state.toastItems = [
				...state.toastItems,
				{
					index: Math.floor(Math.random() * 10000) + 1,
					message: action.payload,
					messageType: ToastMessageType.ERROR,
				},
			];
		},
		setSuccessMessage: (state: ToastState, action: PayloadAction<string>) => {
			state.toastItems = [
				...state.toastItems,
				{
					index: Math.floor(Math.random() * 10000) + 1,
					message: action.payload,
					messageType: ToastMessageType.SUCCESS,
				},
			];
		},
		// setWarningMessage: (state: ToastState, action: PayloadAction<string>) => {
		// 	state.toastItems = [
		// 		...state.toastItems,
		// 		{
		// 			index: Math.floor(Math.random() * 10000) + 1,
		// 			message: action.payload,
		// 			messageType: ToastMessageType.WARNING,
		// 		},
		// 	];
		// },
		setInformationMessage: (state: ToastState, action: PayloadAction<string>) => {
			state.toastItems = [
				...state.toastItems,
				{
					index: Math.floor(Math.random() * 10000) + 1,
					message: action.payload,
					messageType: ToastMessageType.INFORMATION,
				},
			];
		},

		toastReset: (state: ToastState) => {
			state.toastItems = [];
		},
	},
});

export const {setErrorMessage, setSuccessMessage, setInformationMessage, toastReset} = toastSlice.actions;

export default toastSlice.reducer;
