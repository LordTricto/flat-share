import Housemate from "@/models/housemate";

export interface HousemateState {
	housemates: Map<string, Housemate>;
}
