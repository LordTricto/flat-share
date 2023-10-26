import Review from "@/models/review";

export enum FetchReviewStage {
	STAGE_ONE = 1,
	STAGE_TWO = 2,
}
export type FetchReviewForm = {
	id: string;
};

export type FetchReviewFormResponse = {
	status: string;
	message: string;
	data: {
		meta: {
			current_page: number;
			firstItem: number;
			lastItem: number;
			per_page: number;
			total_items: number;
			last_page: number;
		};
		reviews_no: number;
		new_reviews_no: number;
		reviewers: Review[];
	};
};
