import {ChatActionType, ChatType} from "./chatAction.constant";

import {GenericObject} from "@/helpers/types";
import Parsers from "../utils/parsers";
import {immerable} from "immer";

export default class ChatAction {
	[immerable] = true;

	constructor(public type: ChatActionType, public message: string, public ChatType: ChatType) {}

	static create(obj: GenericObject): ChatAction {
		return new ChatAction(Parsers.number(obj.type), Parsers.string(obj.message), Parsers.number(obj.ChatType));
	}
}
