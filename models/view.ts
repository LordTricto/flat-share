import {GenericObject} from "../helpers/types";
import Parsers from "../utils/parsers";
import {immerable} from "immer";

export default class View {
	[immerable] = true;

	constructor(
		public fullname: string,
		public photo: string,
		public review: string,
		public ViewRegistrationDate: string,
		public ViewRegistrationDate2: string,
		public seen: string
	) {}

	static create(obj: GenericObject): View {
		return new View(
			Parsers.string(obj.fullname),
			Parsers.string(obj.photo),
			Parsers.string(obj.review),
			Parsers.string(obj.ViewRegistrationDate),
			Parsers.string(obj.ViewRegistrationDate2),
			Parsers.string(obj.seen)
		);
	}
}
