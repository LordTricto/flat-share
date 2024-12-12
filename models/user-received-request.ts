import {UserActivationStatus, UserReligion, UserSex, UserType} from "./user.constant";

import {GenericObject} from "../helpers/types";
import Housemate from "./housemate";
import Parsers from "../utils/parsers";
import {immerable} from "immer";

export default class UserReceivedRequest {
	[immerable] = true;

	constructor(public received_request_no: number, public received_request_data: Housemate[]) {}

	static create(obj: GenericObject): UserReceivedRequest {
		return new UserReceivedRequest(Parsers.number(obj.received_request_no), Parsers.classObjectArray(obj.received_request_data, Housemate));
	}
}
