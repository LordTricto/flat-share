// export type LoadUserDataForm = {
// email: string;
// };

import Filter from "@/models/filter";
import User from "@/models/user";

export const KEEP_ALIVE_PING = 5; // 5 minutes

export interface LoadUserDataFormResponse {
	success: string;
	message: string;
	user: User;
	filtered: Filter;
}
