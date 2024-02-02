import View from "@/models/view";

export interface ViewsState {
	meta: {
		current_page: number;
		firstItem: number;
		lastItem: number;
		per_page: number;
		total_items: number;
		last_page: number;
	};
	views_no: number;
	new_views_no: number;
	views: View[];
}
