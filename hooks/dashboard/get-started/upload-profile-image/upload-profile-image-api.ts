import {UploadProfileImageForm, UploadProfileImageFormResponse} from "./upload-profile-image.constants";

import Filter from "@/models/filter";
import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import User from "@/models/user";
import UserProfile from "@/models/userProfile";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeRequestWithSignal} from "@/helpers/request/makeRequest";

export enum UploadProfileImageSignal {
	UPLOAD_PROFILE_IMAGE = "user.upload-profile",
}

export const uploadProfileImageApi = async (data: UploadProfileImageForm): Promise<UploadProfileImageFormResponse> => {
	const signal = getAbortControllerSignal(UploadProfileImageSignal.UPLOAD_PROFILE_IMAGE);
	const res = await makeRequestWithSignal("user/upload/profile/image", data, signal);
	if (res instanceof Error) {
		throw res;
	}

	return {
		success: Parsers.string(res.success),
		message: Parsers.string(res.message),
		user: Parsers.classObjectNonNullable((res.data as GenericObject).user, UserProfile),
	};
};
