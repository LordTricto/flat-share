import Review from "@/models/review";

export type PublishReviewForm = {
	review_text: string;
	reviewed_user_codec: string;
};

export type PublishReviewFormResponse = {
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
		reviewers: Review[];
	};
};
