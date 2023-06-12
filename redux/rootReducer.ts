// import applicationSlice from "./application/applicationSlice";
import {combineReducers} from "redux";
import forgotPasswordSlice from "./forgot-password/slice/forgot-password-slice";
import initReducer from "./init/slice/initSlice";
import toastSlice from "./toast/slice/toast-slice";
// import cardsSlice from "./cards/slice/cardsSlice";

const rootReducer = combineReducers({
	/* your app’s top-level reducers */
	init: initReducer,
	toast: toastSlice,
	forgotPassword: forgotPasswordSlice,
	// application: applicationSlice,
});

export default rootReducer;

export type IRootState = ReturnType<typeof rootReducer>;
