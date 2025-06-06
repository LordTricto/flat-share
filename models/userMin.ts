import {UserActivationStatus, UserReligion, UserSex, UserType} from "./user.constant";

import {GenericObject} from "../helpers/types";
import Parsers from "../utils/parsers";
import {immerable} from "immer";

export default class UserMin {
	[immerable] = true;

	constructor(
		public fname: string,
		public lname: string,
		public username: string,
		public phone: string,
		public user_type: UserType | null,
		public created_at: Date | null
	) {}

	static create(obj: GenericObject): UserMin {
		return new UserMin(
			Parsers.string(obj.fname),
			Parsers.string(obj.lname),
			Parsers.string(obj.username),
			Parsers.string(obj.phone),
			Parsers.nullableEnum(obj.user_type, UserType),
			Parsers.date(obj.created_at)
		);
	}
}
