import {UserActivationStatus, UserReligion, UserSex, UserType} from "./user.constant";

import {GenericObject} from "../helpers/types";
import Housemate from "./housemate";
import Parsers from "../utils/parsers";
import {immerable} from "immer";

export default class UserSentRequest {
	[immerable] = true;

	constructor(public sent_request_no: number, public sent_request_data: Housemate[]) {}

	static create(obj: GenericObject): UserSentRequest {
		return new UserSentRequest(Parsers.number(obj.sent_request_no), Parsers.classObjectArray(obj.sent_request_data, Housemate));
	}
}
