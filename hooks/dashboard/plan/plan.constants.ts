import User from "@/models/user";

export type UpdatePlanForm = {
	transaction_reference: string;
	amount: number;
	plan: string;
};

export type UpdatePlanFormResponse = {
	status: string;
	message: string;
	data: {
		amount: string;
		payment_method: string;
		purchase_date: string;
	} | null;
};
