// import {GetStartedForm, GetStartedFormResponse} from "./create-ad.constants";

import {
	CreateAdForm,
	CreateAdFormResponse,
	CreateAdImagesForm,
	CreateAdImagesFormResponse,
	CreateAdPaymentForm,
	CreateAdPaymentFormResponse,
} from "./create-ad.constants";
import {makeRequest, makeRequestWithSignal} from "@/helpers/request/makeRequest";

import {GenericObject} from "@/helpers/types";
import Parsers from "@/utils/parsers";
import User from "@/models/user";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";

export enum CreateAdSignal {
	CREATE_AD = "user.create-ad",
	CREATE_AD_IMAGE = "user.create-ad-image",
	CREATE_AD_PAYMENT = "user.create-ad-payment",
}

export const createAdApi = async (data: CreateAdForm): Promise<CreateAdFormResponse> => {
	const signal = getAbortControllerSignal(CreateAdSignal.CREATE_AD);
	const res = await makeRequestWithSignal("user/host/create/ads", data, signal);
	if (res instanceof Error) {
		throw res;
	}

	return {
		status: Parsers.string(res.status),
		message: Parsers.string(res.message),
		data: Parsers.classObject(res.data, User),
	};
};

export const createAdImageApi = async (data: CreateAdImagesForm): Promise<CreateAdImagesFormResponse> => {
	// const signal = getAbortControllerSignal(CreateAdSignal.CREATE_AD);
	const res = await makeRequest("user/host/property/image/update/binary", data);
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

export const createAdPaymentApi = async (data: CreateAdPaymentForm): Promise<CreateAdPaymentFormResponse> => {
	const signal = getAbortControllerSignal(CreateAdSignal.CREATE_AD_PAYMENT);
	const res = await makeRequestWithSignal("user/verify/host-payment", data, signal);
	if (res instanceof Error) {
		throw res;
	}

	return {
		status: Parsers.string(res.status),
		message: Parsers.string(res.message),
		data: {
			amount: Parsers.string((res.data as GenericObject).amount),
			payment_method: Parsers.string((res.data as GenericObject).payment_method),
			purchase_date: Parsers.string((res.data as GenericObject).purchase_date),
		},
	};
};
