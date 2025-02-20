import UserStatistics from "@/models/user-statistics";

export type DeleteSentRequestForm = {
	id: string;
};

export type DeleteSentRequestFormResponse = {
	status: string;
	signal: string;
	message: string;
	statistics: UserStatistics;
};
