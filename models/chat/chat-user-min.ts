import {UserSex, UserType} from "../user.constant";

import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import {immerable} from "immer";

export default class ChatUserMin {
	[immerable] = true;

	constructor(
		public id: number,
		public fname: string,
		public lname: string,
		public username: string,
		public email: string,
		public phone: string,
		public user_type: UserType | null,
		public profile_photo_path: string,
		public profession: string | null,
		public sex: UserSex | null,
		public created_at: Date | null,
		public updated_at: Date | null,
		public pivot: {
			chat_id: number;
			user_id: number;
		} | null
	) {}

	static create(obj: GenericObject): ChatUserMin {
		return new ChatUserMin(
			Parsers.number(obj.id),
			Parsers.string(obj.fname),
			Parsers.string(obj.lname),
			Parsers.string(obj.username),
			Parsers.string(obj.email),
			Parsers.string(obj.phone),
			Parsers.nullableEnum(obj.user_type, UserType),
			Parsers.string(obj.profile_photo_path),
			Parsers.nullableString(obj.profession),
			Parsers.nullableEnum(obj.sex, UserSex),
			Parsers.date(obj.created_at),
			Parsers.date(obj.updated_at),
			obj.pivot
				? {
						chat_id: Parsers.number((obj.pivot as GenericObject).chat_id),
						user_id: Parsers.number((obj.pivot as GenericObject).user_id),
				  }
				: null
		);
	}
}
