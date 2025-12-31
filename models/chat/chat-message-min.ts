import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import {immerable} from "immer";

export default class ChatMessageMin {
	[immerable] = true;

	constructor(
		public id: number,
		public user_id: number,
		public chat_id: number,
		public content: string,
		public updated_at: Date | null,
		public created_at: Date | null
	) {}
	static create(obj: GenericObject): ChatMessageMin {
		return new ChatMessageMin(
			Parsers.number(obj.id),
			Parsers.number(obj.user_id),
			Parsers.number(obj.chat_id),
			Parsers.string(obj.content),
			Parsers.date(obj.updated_at),
			Parsers.date(obj.created_at)
		);
	}
}
