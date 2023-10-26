export type SendRequestForm = {
	id: string;
};

export type SendRequestFormResponse = {
	signal: string;
	success: string;
	message: string;
	statistics: {
		total_sent_request: number;
		total_received_request: number;
		available_send_request: number;
		available_receive_request: number;
	};
};
