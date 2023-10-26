export type UpdateInterestsForm = {
	sports: string[];
	food_and_drink: string[];
	music: string[];
	film_and_tv: string[];
	other_interests: string[];
};

export type UpdateInterestsFormResponse = {
	success: string;
	message: string;
	interests: {
		food: string[];
		music: string[];
		others: string[];
		sports: string[];
		film_and_tv: string[];
	};
};
