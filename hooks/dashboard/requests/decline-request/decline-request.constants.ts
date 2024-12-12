import UserStatistics from "@/models/user-statistics";

export type DeclineRequestForm = {
	id: string;
};

export type DeclineRequestFormResponse = {
	status: string;
	message: string;
	signal: string;
	statistics: UserStatistics;
};
