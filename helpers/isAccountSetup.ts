import User from "@/models/user";
import store from "@/redux/store";

export function accountSetupProgress() {
	let isPersonalDetailsNotCompleted = false;
	let isAccountSetupCompleted = false;
	let isPreferenceNotCompleted = false;
	let isInterestsNotCompleted = false;

	const user = store.getState().init.user as User;
	const filter = store.getState().init.filter;
	const interests = store.getState().init.interests;

	if (user) {
		isPersonalDetailsNotCompleted =
			user.bio.length < 1 || user.education.length < 1 || !user.age || !user.profession || !user.religion || !user.sex;
	}
	if (filter) {
		isPreferenceNotCompleted =
			!filter.min_budget ||
			!filter.max_budget ||
			!filter.preferred_location_1 ||
			!filter.preferred_user_type ||
			!filter.preferred_profession ||
			!filter.preferred_religion ||
			!filter.preferred_sex ||
			!filter.state_of_interest ||
			!filter.preferred_first_age_range ||
			!filter.preferred_second_age_range ||
			!filter.preferred_user_type;
	}
	if (interests) {
		isInterestsNotCompleted =
			interests.film_and_tv.length < 1 ||
			interests.food.length < 1 ||
			interests.music.length < 1 ||
			interests.others.length < 1 ||
			interests.sports.length < 1;
	}

	isAccountSetupCompleted = !isPreferenceNotCompleted && !isInterestsNotCompleted && !isPersonalDetailsNotCompleted;

	return {
		isAccountSetupCompleted,
		isInterestsCompleted: !isInterestsNotCompleted,
		isPreferenceCompleted: !isPreferenceNotCompleted,
		isPersonalDetailsCompleted: !isPersonalDetailsNotCompleted,
	};
}
