import {GenericObject} from "../helpers/types";
import Parsers from "./parsers";
import isNullOrUndefined from "./isNullOrUndefined";

export function getErrorMessage(err: unknown): string {
	if (err instanceof Error) {
		return err.message;
	} else if (typeof err === "object" && !isNullOrUndefined(err) && "message" in err) {
		return Parsers.string((err as GenericObject).message);
	} else if (typeof err === "string") {
		return err.toString();
	}
	return "Something went wrong. Please try again or contact support";
}
