import {RequestCancelledError, UnauthorizedError} from "./requestErrors";
import axios, {AxiosError, AxiosRequestHeaders, AxiosResponse} from "axios";

import {GenericObject} from "../types";
import {apiInstance} from "../../utils/utils";
import store from "../../redux/store";

export enum ErrorMessage {
	AXIOS_CANCEL_ERROR = "canceled",
	GENERIC_ERROR = "Something went wrong. Please try again or contact support.",
	UNAUTHORIZED_ERROR = "Unauthorized",
	UNAUTHORIZED_TEXT_ERROR = "Request failed with status code 401",
	ACCOUNT_CREATED_ERROR = "The account has already been created",
	TIMEOUT_ERROR = "timeout of 180000ms exceeded",
	IGNORE = "ignore",
}

export interface BaseRequest {
	status: boolean;
	message: string;
}

function processResponse(res: AxiosResponse<GenericObject | string>): GenericObject | Error {
	const data = typeof res.data === "string" ? (JSON.parse(res.data) as GenericObject) : res.data;

	if (data.status != "success") {
		return new Error(data.message as string);
	}
	return data;
}

function getErrorResponse(err: unknown): Error {
	if (axios.isAxiosError(err)) {
		// const axiosError = err as AxiosError;

		// if (axiosError.response && axiosError.response.status === 422) {
		// 	return new IgnorableError();
		// }

		// Checking if error message is "canceled" i.e default axios abort message
		if (err.name === "AbortError" || err.message === ErrorMessage.AXIOS_CANCEL_ERROR) {
			return new RequestCancelledError();
		}
		if (err.message === ErrorMessage.UNAUTHORIZED_ERROR || err.message === ErrorMessage.UNAUTHORIZED_TEXT_ERROR) {
			return new UnauthorizedError();
		}
		if (err.message === ErrorMessage.TIMEOUT_ERROR) {
			return new Error(ErrorMessage.GENERIC_ERROR);
		}
		if (err.cause === ErrorMessage.TIMEOUT_ERROR) {
			return new Error(ErrorMessage.GENERIC_ERROR);
		}

		return err;
	}

	if (typeof err === "string") {
		return new Error(err);
	}

	return new Error(ErrorMessage.GENERIC_ERROR);
}

function getToken(): string {
	const state = store.getState();
	const userToken = state.token.token || undefined;
	if (!userToken) {
		return "";
	}
	return userToken;
}

function getHeaders(): AxiosRequestHeaders {
	const headers: AxiosRequestHeaders = {
		Authorization: `Bearer ${getToken()}`,
		"User-Agent": "Mozilla/4.0 (compatible; MSIE 9.11; Windows NT 10.0; Open Live Writer 1.0)",
	};
	return headers;
}

export async function makeRequest(url: string, data: GenericObject = {}): Promise<GenericObject | Error> {
	try {
		const requestData = {...data};
		const res: AxiosResponse<string> = await apiInstance.post(url, requestData, {
			headers: getHeaders(),
			timeout: 180000, // only wait for 3mins
		});
		return processResponse(res);
	} catch (err) {
		return getErrorResponse(err);
	}
}

export async function makeGetRequest(url: string): Promise<GenericObject | Error> {
	try {
		const res: AxiosResponse<string> = await apiInstance.get(url, {
			headers: getHeaders(),
			timeout: 180000, // only wait for 3mins
		});
		return processResponse(res);
	} catch (err) {
		return getErrorResponse(err);
	}
}

export async function makeRequestWithSignal(url: string, data: GenericObject = {}, signal: AbortSignal): Promise<GenericObject | Error> {
	try {
		const requestData = {...data};
		const res: AxiosResponse<string> = await apiInstance.post(url, requestData, {
			headers: getHeaders(),
			signal,
			timeout: 180000, // only wait for 3mins
		});
		return processResponse(res);
	} catch (err: unknown) {
		return getErrorResponse(err);
	}
}

export async function makeGetRequestWithSignal(url: string, signal: AbortSignal): Promise<GenericObject | Error> {
	try {
		const res: AxiosResponse<string> = await apiInstance.get(url, {
			headers: getHeaders(),
			signal,
			timeout: 180000, // only wait for 3mins
		});
		return processResponse(res);
	} catch (err: unknown) {
		return getErrorResponse(err);
	}
}
export async function makeDeleteRequestWithSignal(url: string, data: GenericObject = {}, signal: AbortSignal): Promise<GenericObject | Error> {
	try {
		const requestData = {...data};
		const res: AxiosResponse<string> = await apiInstance.delete(url, {
			headers: getHeaders(),
			data: requestData,
			signal,
			timeout: 180000, // only wait for 3mins
		});
		return processResponse(res);
	} catch (err: unknown) {
		return getErrorResponse(err);
	}
}

export async function makeRequestThrowError(url: string, data: GenericObject = {}): Promise<GenericObject> {
	let axiosResponse: AxiosResponse<string>;
	try {
		const requestData = {...data};
		axiosResponse = await apiInstance.post(url, requestData, {
			headers: getHeaders(),
			timeout: 180000, // only wait for 3mins
		});
	} catch (err) {
		throw getErrorResponse(err);
	}

	const res = processResponse(axiosResponse);
	if (res instanceof Error) {
		throw getErrorResponse(res);
	}

	return res;
}

export async function makeRequestUploadFile(url: string, data: FormData): Promise<GenericObject | Error> {
	try {
		const headers = getHeaders();
		headers["Content-Type"] = "multipart/form-data";

		const res: AxiosResponse<GenericObject> = await apiInstance.post(url, data, {
			headers,
			timeout: 180000, // only wait for 3mins
		});
		return processResponse(res);
	} catch (err) {
		return getErrorResponse(err);
	}
}
export async function makeRequestUploadFileWithSignal(url: string, data: FormData, signal: AbortSignal): Promise<GenericObject | Error> {
	try {
		const headers = getHeaders();
		headers["Content-Type"] = "multipart/form-data";

		const res: AxiosResponse<GenericObject> = await apiInstance.post(url, data, {
			headers,
			signal,
			timeout: 180000, // only wait for 3mins
		});
		return processResponse(res);
	} catch (err) {
		return getErrorResponse(err);
	}
}
export async function makeRequestDownloadFile(url: string, data: GenericObject = {}): Promise<Blob | Error> {
	try {
		const requestData = {...data};
		const res: AxiosResponse<string> = await apiInstance.post(url, requestData, {
			headers: getHeaders(),
			responseType: "blob",
			timeout: 180000, // only wait for 3mins
		});
		const contentTypeHeader = res.headers["content-type"];
		if (contentTypeHeader !== "application/json" && contentTypeHeader.indexOf("text/plain") !== 0) {
			return new Blob([res.data as unknown as string], {type: contentTypeHeader});
		}
		return processResponse(res) as Error;
	} catch (err) {
		return getErrorResponse(err);
	}
}
