import {UserSex, UserType} from "../user.constant";

import Chat from "./chat";
import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import {immerable} from "immer";
import titleCase from "@/utils/titleCase";

export default class ChatUser {
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
		public chats: Chat[]
	) {}

	static create(obj: GenericObject): ChatUser {
		return new ChatUser(
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
			Parsers.classObjectArray(obj.chats, Chat)
		);
	}

	get fullName(): string {
		return `${titleCase(this.fname)} ${titleCase(this.lname)}`;
	}
	get isHost(): boolean {
		return this.user_type === UserType.HOST;
	}

	get isHostHunter(): boolean {
		return this.user_type === UserType.HOST_HUNTERS;
	}
}
