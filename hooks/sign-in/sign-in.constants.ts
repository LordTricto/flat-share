import Filter from "@/models/filter";
import User from "@/models/user";

export type SignInForm = {
	username: string;
	password: string;
};
export interface SignInFormResponse {
	success: string;
	message: string;
	token: string;
	user: User;
	filtered: Filter;
}
