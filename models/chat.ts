import {ChatType} from "./chatAction.constant";
import {GenericObject} from "@/helpers/types";
import Parsers from "../utils/parsers";
import {immerable} from "immer";

export default class Chat {
	[immerable] = true;

	constructor(
		public id: string,
		public isSender: boolean,
		public name: string,
		public dateTime: Date | null,
		public chats: string[],
		public ChatType: ChatType
	) {}

	static create(obj: GenericObject): Chat {
		return new Chat(
			Parsers.string(obj.id),
			Parsers.boolean(obj.isSender),
			Parsers.string(obj.name),
			Parsers.date(obj.dateTime),
			Parsers.stringArray(obj.chats),
			Parsers.number(obj.ChatType)
		);
	}
}
