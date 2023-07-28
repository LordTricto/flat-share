import {UserActivationStatus, UserReligion, UserSex, UserType} from "./user.constant";

import {GenericObject} from "../helpers/types";
import Parsers from "../utils/parsers";
import {immerable} from "immer";

export default class User {
	[immerable] = true;

	constructor(
		public id: number,
		public codec: string | null,
		public fname: string,
		public lname: string,
		public username: string,
		public email: string,
		public sex: UserSex | null,
		public age: number | null,
		public bio: string,
		public phone: string,
		public user_type: UserType | null,
		public profile_photo_path: string,
		public profession: string | null,
		public religion: UserReligion | null,
		public education: string,
		public account_status: UserActivationStatus | null,
		public last_login: Date | null,
		public created_at: Date | null
	) {}

	static create(obj: GenericObject): User {
		return new User(
			Parsers.number(obj.id),
			Parsers.nullableString(obj.codec),
			Parsers.string(obj.fname),
			Parsers.string(obj.lname),
			Parsers.string(obj.username),
			Parsers.string(obj.email),
			Parsers.nullableEnum(obj.sex, UserSex),
			Parsers.nullableNumber(obj.age),
			Parsers.string(obj.bio),
			Parsers.string(obj.phone),
			Parsers.nullableEnum(obj.user_type, UserType),
			Parsers.string(obj.profile_photo_path),
			Parsers.nullableString(obj.profession),
			Parsers.nullableEnum(obj.religion, UserReligion),
			Parsers.string(obj.education),
			Parsers.nullableEnum(obj.account_status, UserActivationStatus),
			Parsers.date(obj.last_login),
			Parsers.date(obj.created_at)
		);
	}
}
