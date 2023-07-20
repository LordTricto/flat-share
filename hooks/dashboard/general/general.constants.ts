import {DropdownItem} from "@/helpers/types";
import Filter from "@/models/filter";
import User from "@/models/user";
import helpInactiveIcon from "@/public/images/dashboard/sections/help/help-inactive.svg";
// export type LoadUserDataForm = {
// email: string;
// };
import logoutIcon from "@/public/images/icons/logout.svg";

export const KEEP_ALIVE_PING = 5; // 5 minutes

export interface LoadUserDataFormResponse {
	success: string;
	message: string;
	user: User;
	filtered: Filter;
}

export const accountTypeOptions: DropdownItem<number>[] = [
	{
		icon: helpInactiveIcon,
		text: "Help",
		value: 1,
	},
	{
		icon: logoutIcon,
		text: "Logout",
		value: 2,
	},
];
