import {DropdownItem} from "@/helpers/types";

export type ReportReviewForm = {
	reason: string;
	message: string;
	reported_user_codec: string;
};

export type ReportReviewFormResponse = {
	status: string;
	message: string;
};

export const reportReasonOptions: DropdownItem<string>[] = [
	{
		text: "Account not real",
		value: "Account not real",
	},
	{
		text: "Spamming or phishing",
		value: "Spamming or phishing",
	},
	{
		text: "Not compatible",
		value: "Not compatible",
	},
	{
		text: "Abusing the system",
		value: "Abusing the system",
	},
	{
		text: "Can't reach an agreement",
		value: "Can't reach an agreement",
	},
	{
		text: "Insufficient budget",
		value: "Insufficient budget",
	},
	{
		text: "Location problem",
		value: "Location problem",
	},
	{
		text: "Uploaded false property",
		value: "Uploaded false property",
	},
	{
		text: "Unserious and unready",
		value: "Unserious and unready",
	},
	{
		text: "Not picking calls",
		value: "Not picking calls",
	},
	{
		text: "Other",
		value: "Other",
	},
];
