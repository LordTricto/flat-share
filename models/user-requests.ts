import {UserActivationStatus, UserReligion, UserSex, UserType} from "./user.constant";

import {GenericObject} from "../helpers/types";
import Housemate from "./housemate";
import Parsers from "../utils/parsers";
import UserReceivedRequest from "./user-received-request";
import UserSentRequest from "./user-sent-request";
import {immerable} from "immer";

export default class UserRequests {
	[immerable] = true;

	constructor(public sent_request: UserSentRequest, public received_request: UserReceivedRequest) {}

	static create(obj: GenericObject): UserRequests {
		return new UserRequests(
			Parsers.classObjectNonNullable(obj.sent_request, UserSentRequest),
			Parsers.classObjectNonNullable(obj.received_request, UserReceivedRequest)
		);
	}
}
