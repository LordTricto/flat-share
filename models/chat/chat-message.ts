import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import {immerable} from "immer";

export default class ChatMessage {
	[immerable] = true;

	constructor(
		public id: number,
		public user_id: number,
		public chat_id: number,
		public reply_to: null,
		public content: string,
		public image: null,
		public is_read: boolean,
		public created_at: Date | null,
		public updated_at: Date | null
	) {}
	static create(obj: GenericObject): ChatMessage {
		return new ChatMessage(
			Parsers.number(obj.id),
			Parsers.number(obj.user_id),
			Parsers.number(obj.chat_id),
			null,
			Parsers.string(obj.content),
			null,
			Parsers.boolean(obj.is_read),
			Parsers.date(obj.created_at),
			Parsers.date(obj.updated_at)
		);
	}
}
