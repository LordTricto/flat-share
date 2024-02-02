import Housemate from "@/models/housemate";

export interface HousemateState {
	housemates: Map<string, Housemate>;
	requests: {
		sentRequest: Housemate[];
		sentRequestsNo: number;
		receivedRequest: Housemate[];
		receivedRequestsNo: number;
	};
}
