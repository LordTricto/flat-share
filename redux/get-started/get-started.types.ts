import {UserReligion, UserSex, UserType} from "@/models/user.constant";

import {GetStartedStage} from "@/hooks/dashboard/get-started/account-setup/get-started.constants";

export interface GetStartedState {
	isHost: boolean;
	stage: GetStartedStage;

	userData: {
		sex: UserSex | null;
		age: string;
		bio: string;
		budget: number;
		religion: UserReligion | null;
		user_type: UserType | null;
		education: string;
		location_1: string;
		location_2: string;
		profession: string;
	};
}
