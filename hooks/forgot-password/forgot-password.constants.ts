import UserMin from "@/models/userMin";

export type ForgotPasswordForm = {
	email: string;
};

export interface ForgotPasswordFormResponse {
	success: string;
	message: string;
}