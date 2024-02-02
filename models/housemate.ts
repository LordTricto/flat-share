import {UserReligion, UserSex, UserType} from "./user.constant";

import {GenericObject} from "../helpers/types";
import Parsers from "../utils/parsers";
import {immerable} from "immer";

export default class Housemate {
	[immerable] = true;

	constructor(
		public age: number | null,
		public bio: string,
		public budget: string,
		public codec: string | null,
		public education: string,
		public fullname: string,
		public gender: UserSex | null,
		public join_date: Date | null,
		public last_login: Date | null,
		public location_1: string,
		public location_2: string,
		public photo: string,
		public profession: string | null,
		public religion: UserReligion | null,
		public reviews: number,
		public user_type: UserType | null,
		public views: number
	) {}

	static create(obj: GenericObject): Housemate {
		return new Housemate(
			Parsers.nullableNumber(obj.age),
			Parsers.string(obj.bio),
			Parsers.string(obj.budget),
			Parsers.nullableString(obj.codec),
			Parsers.string(obj.education),
			Parsers.string(obj.fullname),
			Parsers.nullableEnum(obj.gender, UserSex),
			Parsers.date(obj.join_date),
			Parsers.date(obj.last_login),
			Parsers.string(obj.location_1),
			Parsers.string(obj.location_2),
			Parsers.string(obj.photo),
			Parsers.nullableString(obj.profession),
			Parsers.nullableEnum(obj.religion, UserReligion),
			Parsers.number(obj.reviews),
			Parsers.nullableEnum(obj.user_type, UserType),
			Parsers.number(obj.reviews)
		);
	}

	get isHost(): boolean {
		return this.user_type === UserType.HOST;
	}
	get isHostHunter(): boolean {
		return this.user_type === UserType.HOST_HUNTERS;
	}
}
