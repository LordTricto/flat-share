import {UserActivationStatus, UserReligion, UserSex, UserType} from "./user.constant";

import {GenericObject} from "../helpers/types";
import Parsers from "../utils/parsers";
import {immerable} from "immer";

export default class UserProfile {
	[immerable] = true;

	constructor(public profile_photo_path: string) {}

	static create(obj: GenericObject): UserProfile {
		return new UserProfile(Parsers.string(obj.profile_photo_path));
	}
}
