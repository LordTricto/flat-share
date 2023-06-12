import UserMin from "@/models/userMin";

export type SignUpForm = {
	firstname: string;
	lastname: string;
	phone: string;
	email: string;
	password: string;
};

export interface SignUpFormResponse {
	success: string;
	message: string;
	user: UserMin;
}
