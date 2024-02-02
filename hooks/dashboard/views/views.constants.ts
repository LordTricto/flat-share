import View from "@/models/view";

export type ViewsFormResponse = {
	status: string;
	message: string;
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
	viewers: View[];
};
