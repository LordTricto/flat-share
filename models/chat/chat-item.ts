import {UserSex, UserType} from "../user.constant";

import Chat from "./chat";
import ChatMessage from "./chat-message";
import ChatUser from "./chat-user";
import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import {immerable} from "immer";

export default class ChatItem {
	[immerable] = true;

	constructor(
		public id: number,
		public name: string,
		public created_at: Date | null,
		public updated_at: Date | null,
		public users: ChatUser[],
		public messages: ChatMessage[]
	) {}

	static create(obj: GenericObject): ChatItem {
		return new ChatItem(
			Parsers.number(obj.id),
			Parsers.string(obj.name),
			Parsers.date(obj.created_at),
			Parsers.date(obj.updated_at),
			Parsers.classObjectArray(obj.users, ChatUser),
			Parsers.classObjectArray(obj.messages, ChatMessage)
		);
	}
}
