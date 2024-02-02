import {combineReducers} from "redux";
import forgotPasswordSlice from "./forgot-password/slice/forgot-password-slice";
import getStartedSlice from "./get-started/get-started";
import housemateSlice from "./housemates/housemateSlice";
import initReducer from "./init/slice/initSlice";
import toastSlice from "./toast/slice/toast-slice";
import tokenReducer from "./token/slice/tokenSlice";
import viewsSlice from "./views/viewsSlice";

const rootReducer = combineReducers({
	/* your app’s top-level reducers */
	init: initReducer,
	token: tokenReducer,
	toast: toastSlice,
	forgotPassword: forgotPasswordSlice,
	getStarted: getStartedSlice,
	housemates: housemateSlice,
	views: viewsSlice,
});

export default rootReducer;

export type IRootState = ReturnType<typeof rootReducer>;
