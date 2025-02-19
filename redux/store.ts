import {configureStore} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import rootReducer from "./rootReducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	whitelist: ["token"],
	// blacklist: ["error", "application", "message"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: false,
			serializableCheck: {
				// ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				ignoreState: true,
				ignoreActions: true,
			},
		}),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
