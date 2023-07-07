// export type LoadUserDataForm = {
// email: string;
// };

import Filter from "@/models/filter";
import User from "@/models/user";

export interface LoadUserDataFormResponse {
	success: string;
	message: string;
	user: User;
	filtered: Filter;
}
