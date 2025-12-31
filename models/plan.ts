import {UserActivationStatus, UserReligion, UserSex, UserType} from "./user.constant";

import {GenericObject} from "../helpers/types";
import Parsers from "../utils/parsers";
import {immerable} from "immer";

export default class Plan {
	[immerable] = true;

	constructor(
		public active_plan: string,
		public free_plan_active_receive_request: number,
		public free_plan_active_send_request: number,
		public free_plan_price: string,
		public gold_plan_active_receive_request: number,
		public gold_plan_active_send_request: number,
		public gold_plan_price: string,
		public gold_plan_price_raw: number,
		public platinum_plan_active_receive_request: number,
		public platinum_plan_active_send_request: number,
		public platinum_plan_price: string,
		public platinum_plan_price_raw: number,
		public starter_plan_active_receive_request: number,
		public starter_plan_active_send_request: number,
		public starter_plan_price: string,
		public starter_plan_price_raw: number
	) {}

	static create(obj: GenericObject): Plan {
		return new Plan(
			Parsers.string(obj.active_plan),
			Parsers.number(obj.free_plan_active_receive_request),
			Parsers.number(obj.free_plan_active_send_request),
			Parsers.string(obj.free_plan_price),
			Parsers.number(obj.gold_plan_active_receive_request),
			Parsers.number(obj.gold_plan_active_send_request),
			Parsers.string(obj.gold_plan_price),
			Parsers.number(obj.gold_plan_price_raw),
			Parsers.number(obj.platinum_plan_active_receive_request),
			Parsers.number(obj.platinum_plan_active_send_request),
			Parsers.string(obj.platinum_plan_price),
			Parsers.number(obj.platinum_plan_price_raw),
			Parsers.number(obj.starter_plan_active_receive_request),
			Parsers.number(obj.starter_plan_active_send_request),
			Parsers.string(obj.starter_plan_price),
			Parsers.number(obj.starter_plan_price_raw)
		);
	}
}
