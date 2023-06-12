import UserMin from "@/models/userMin";

export type ResetPasswordForm = {
	email: string;
	new_password: string;
};

export interface ResetPasswordFormResponse {
	success: string;
	message: string;
}
