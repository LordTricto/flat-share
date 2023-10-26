import {GenericObject} from "../helpers/types";
import Parsers from "../utils/parsers";
import {immerable} from "immer";

export default class Review {
	[immerable] = true;

	constructor(public fullname: string, public photo: string, public review: string, public ReviewRegistrationDate: string, public seen: string) {}

	static create(obj: GenericObject): Review {
		return new Review(
			Parsers.string(obj.fullname),
			Parsers.string(obj.photo),
			Parsers.string(obj.review),
			Parsers.string(obj.ReviewRegistrationDate),
			Parsers.string(obj.seen)
		);
	}
}
