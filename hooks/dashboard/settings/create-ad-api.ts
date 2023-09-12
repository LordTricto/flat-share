// import {GetStartedForm, GetStartedFormResponse} from "./create-ad.constants";

import {CreateAdForm, CreateAdFormResponse, CreateAdImagesForm, CreateAdImagesFormResponse} from "./settings.constants";

import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import User from "@/models/user";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeRequestWithSignal} from "@/helpers/request/makeRequest";

export enum CreateAdSignal {
	CREATE_AD = "user.create-ad",
	CREATE_AD_IMAGE = "user.create-ad-image",
}

export const createAdApi = async (data: CreateAdForm): Promise<CreateAdFormResponse> => {
	const signal = getAbortControllerSignal(CreateAdSignal.CREATE_AD);
	const res = await makeRequestWithSignal("user/host/update/property", data, signal);
	if (res instanceof Error) {
		throw res;
	}

	return {
		status: Parsers.string(res.status),
		message: Parsers.string(res.message),
		data: Parsers.classObjectNonNullable(res.data, User),
	};
};

export const createAdImageApi = async (data: CreateAdImagesForm): Promise<CreateAdImagesFormResponse> => {
	const signal = getAbortControllerSignal(CreateAdSignal.CREATE_AD);
	const res = await makeRequestWithSignal("user/host/update/property", data, signal);
	if (res instanceof Error) {
		throw res;
	}

	return {
		status: Parsers.string(res.status),
		message: Parsers.string(res.message),
		data: {
			property_image_thumb_url: Parsers.string((res.data as GenericObject).property_image_thumb_url),
			property_image_url: Parsers.string((res.data as GenericObject).property_image_url),
		},
	};
};
