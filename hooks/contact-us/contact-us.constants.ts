import UserMin from "@/models/userMin";

export type ContactUsForm = {
	fullname: string;
	email: string;
	subject: string;
	message: string;
};

export interface ContactUsFormResponse {
	success: string;
	message: string;
}
