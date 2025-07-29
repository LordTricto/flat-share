import {GenericObject} from "@/helpers/types";
import Parsers from "../utils/parsers";
import {immerable} from "immer";

export default class PropertyImage {
	[immerable] = true;

	constructor(public image_id: string, public property_image: string, public property_image_thumb: string) {}

	static create(obj: GenericObject): PropertyImage {
		return new PropertyImage(Parsers.string(obj.image_id), Parsers.string(obj.property_image), Parsers.string(obj.property_image_thumb));
	}
}
