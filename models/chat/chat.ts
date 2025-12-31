import ChatMessage from "./chat-message";
import ChatUserMin from "./chat-user-min";
import {GenericObject} from "@/helpers/types";
import Parsers from "../../utils/parsers";
import {immerable} from "immer";

export default class Chat {
	[immerable] = true;

	constructor(
		public id: string,
		public name: string,
		public created_at: Date | null,
		public updated_at: Date | null,
		public pivot: {
			user_id: number;
			chat_id: number;
		} | null,
		public users: ChatUserMin[],
		public messages: ChatMessage[]
	) {}

	static create(obj: GenericObject): Chat {
		return new Chat(
			Parsers.string(obj.id),
			Parsers.string(obj.name),
			Parsers.date(obj.created_at),
			Parsers.date(obj.updated_at),
			obj.pivot
				? {
						chat_id: Parsers.number((obj.pivot as GenericObject).chat_id),
						user_id: Parsers.number((obj.pivot as GenericObject).user_id),
				  }
				: null,
			Parsers.classObjectArray(obj.users, ChatUserMin),
			Parsers.classObjectArray(obj.messages, ChatMessage)
		);
	}
}
