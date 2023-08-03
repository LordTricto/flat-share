import {UserActivationStatus, UserReligion, UserSex, UserType} from "./user.constant";

import {GenericObject} from "../helpers/types";
import Parsers from "../utils/parsers";
import {immerable} from "immer";

export default class Filter {
	[immerable] = true;

	constructor(
		public preferred_first_age_range: number | null,
		public preferred_second_age_range: number | null,
		public preferred_profession: string | null,
		public preferred_education: string | null,
		public preferred_religion: UserReligion | null,
		public preferred_sex: UserSex | null,
		public min_budget: number | null,
		public max_budget: number | null,
		public preferred_location_1: string | null,
		public preferred_location_2: string | null,
		public state_of_interest: string | null,
		public preferred_user_type: UserType | null
	) {}

	static create(obj: GenericObject): Filter {
		return new Filter(
			Parsers.nullableNumber(obj.preferred_first_age_range),
			Parsers.nullableNumber(obj.preferred_second_age_range),
			Parsers.nullableString(obj.preferred_profession),
			Parsers.nullableString(obj.preferred_education),
			Parsers.nullableEnum(obj.preferred_religion, UserReligion),
			Parsers.nullableEnum(obj.preferred_sex, UserSex),
			Parsers.nullableNumber(obj.min_budget),
			Parsers.nullableNumber(obj.max_budget),
			Parsers.nullableString(obj.preferred_location_1),
			Parsers.nullableString(obj.preferred_location_2),
			Parsers.nullableString(obj.state_of_interest),
			Parsers.nullableEnum(obj.preferred_user_type, UserType)
		);
	}
}
