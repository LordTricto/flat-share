import {PayloadAction, createSlice} from "@reduxjs/toolkit";

import {ViewsFormResponse} from "@/hooks/dashboard/views/views.constants";
import {ViewsState} from "./viewsSlice.types";

const initialState: ViewsState = {
	views: [],
	views_no: 0,
	new_views_no: 0,
	meta: {
		current_page: 0,
		firstItem: 0,
		lastItem: 0,
		per_page: 0,
		total_items: 0,
		last_page: 0,
	},
};

export const viewsSlice = createSlice({
	name: "views",
	initialState,
	reducers: {
		setViews: (state: ViewsState, action: PayloadAction<ViewsFormResponse>) => {
			state.views = action.payload.viewers;
			state.meta = action.payload.meta;
			state.new_views_no = action.payload.new_views_no;
			state.views_no = action.payload.views_no;
		},

		ResetViews: (state: ViewsState) => {
			state.views = [];
			state.views_no = 0;
			state.new_views_no = 0;
			state.meta = {
				current_page: 0,
				firstItem: 0,
				lastItem: 0,
				per_page: 0,
				total_items: 0,
				last_page: 0,
			};
		},
	},
});

export const {setViews, ResetViews} = viewsSlice.actions;

export default viewsSlice.reducer;
