import {ChatType} from "./chatAction.constant";
import {GenericObject} from "@/helpers/types";
import Parsers from "../utils/parsers";
import {immerable} from "immer";

export default class ChatTime {
	[immerable] = true;

	constructor(public dateTime: Date | null, public ChatType: ChatType) {}

	static create(obj: GenericObject): ChatTime {
		return new ChatTime(Parsers.date(obj.dateTime), Parsers.number(obj.ChatType));
	}
}
