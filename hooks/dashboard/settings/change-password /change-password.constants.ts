import UserMin from "@/models/userMin";

export type ChangePasswordForm = {
	current_password: string;
	new_password: string;
};

export interface ChangePasswordFormResponse {
	success: string;
	message: string;
}
