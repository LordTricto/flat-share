import {ErrorMessage} from "./makeRequest";

export class UnauthorizedError extends Error {
	constructor() {
		super(ErrorMessage.UNAUTHORIZED_ERROR);
	}
}

export class IgnorableError extends Error {
	constructor() {
		super(ErrorMessage.IGNORE);
	}
}

export class RequestCancelledError extends Error {
	constructor() {
		super(ErrorMessage.AXIOS_CANCEL_ERROR);
	}
}
