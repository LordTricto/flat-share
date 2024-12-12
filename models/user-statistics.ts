import {UserActivationStatus, UserReligion, UserSex, UserType} from "./user.constant";

import {GenericObject} from "../helpers/types";
import Parsers from "../utils/parsers";
import {immerable} from "immer";

export default class UserStatistics {
	[immerable] = true;

	constructor(
		public total_sent_request: number,
		public available_send_request: number,
		public total_received_request: number,
		public available_receive_request: number
	) {}

	static create(obj: GenericObject): UserStatistics {
		return new UserStatistics(
			Parsers.number(obj.total_sent_request),
			Parsers.number(obj.available_send_request),
			Parsers.number(obj.total_received_request),
			Parsers.number(obj.available_receive_request)
		);
	}
}
