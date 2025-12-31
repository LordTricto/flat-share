import ChatItem from "./chat-item";
import ChatLink from "./chat-link";
import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import {immerable} from "immer";

export default class ChatList {
	[immerable] = true;

	constructor(
		public current_page: number,
		public first_page_url: string,
		public from: number,
		public last_page: number,
		public last_page_url: string | null,
		public next_page_url: string | null,
		public path: string,
		public per_page: number,
		public prev_page_url: string | null,
		public to: number,
		public total: number,
		public links: ChatLink[],
		public data: ChatItem[]
	) {}

	static create(obj: GenericObject): ChatList {
		return new ChatList(
			Parsers.number(obj.current_page),
			Parsers.string(obj.first_page_url),
			Parsers.number(obj.from),
			Parsers.number(obj.last_page),
			Parsers.nullableString(obj.last_page_url),
			Parsers.nullableString(obj.next_page_url),
			Parsers.string(obj.path),
			Parsers.number(obj.per_page),
			Parsers.nullableString(obj.prev_page_url),
			Parsers.number(obj.to),
			Parsers.number(obj.total),
			Parsers.classObjectArray(obj.links, ChatLink),
			Parsers.classObjectArray(obj.data, ChatItem)
		);
	}
}
