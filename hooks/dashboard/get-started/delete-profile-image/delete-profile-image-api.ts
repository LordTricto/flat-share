import {makeDeleteRequestWithSignal, makeRequestWithSignal} from "@/helpers/request/makeRequest";

import {DeleteProfileImageFormResponse} from "./delete-profile-image.constants";
import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";

export enum DeleteProfileImageSignal {
	DELETE_PROFILE_IMAGE = "user.delete-profile",
}

export const deleteProfileImageApi = async (): Promise<DeleteProfileImageFormResponse> => {
	const signal = getAbortControllerSignal(DeleteProfileImageSignal.DELETE_PROFILE_IMAGE);
	const res = await makeDeleteRequestWithSignal("user/delete/profile/image", {}, signal);
	if (res instanceof Error) {
		throw res;
	}

	return {
		success: Parsers.string(res.success),
		message: Parsers.string(res.message),
		user: Parsers.string((res.data as GenericObject).user),
	};
};
