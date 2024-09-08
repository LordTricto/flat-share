import {UserActivationStatus, UserReligion, UserSex, UserType} from "./user.constant";

import {GenericObject} from "../helpers/types";
import {NotificationStatus} from "./notification.constant";
import Parsers from "../utils/parsers";
import {immerable} from "immer";

export default class Notification {
	[immerable] = true;

	constructor(
		public fullname: string,
		public photo: string,
		public description: string,
		public signal: string,
		public notification_creation_date: Date | null,
		public notification_creation_date2: string | null,
		public seen: NotificationStatus | null,
		public notification_id: number
	) {}

	static create(obj: GenericObject): Notification {
		return new Notification(
			Parsers.string(obj.fullname),
			Parsers.string(obj.photo),
			Parsers.string(obj.description),
			Parsers.string(obj.signal),
			Parsers.date(obj.notification_creation_date),
			Parsers.nullableString(obj.notification_creation_date2),
			Parsers.nullableEnum(obj.seen, NotificationStatus),
			Parsers.number(obj.notification_id)
		);
	}
}
