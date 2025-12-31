import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import {immerable} from "immer";

export default class ChatLink {
	[immerable] = true;

	constructor(public url: string | null, public label: string, public active: boolean) {}

	static create(obj: GenericObject): ChatLink {
		return new ChatLink(Parsers.string(obj.url), Parsers.string(obj.label), Parsers.boolean(obj.active));
	}
}
