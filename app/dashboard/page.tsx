"use client";

import Button from "@/components/general/button/button";
import {IRootState} from "@/redux/rootReducer";
import NotificationBar from "@/components/dashboard/general/notification-bar/notification-bar";
import SearchBar from "@/components/general/search-bar";
import UserCard from "@/components/dashboard/home/cards/user-card";
import {UserReligion} from "@/models/user.constant";
import UserRequest from "@/components/dashboard/home/cards/user-request";
import WelcomeCard from "@/components/dashboard/general/cards/welcome-card/welcome-card";
import requestAvatarOne from "@/public/images/dashboard/home/request-1.png";
import requestAvatarTwo from "@/public/images/dashboard/home/request-2.png";
import {useSelector} from "react-redux";
import {useState} from "react";
import userOne from "@/public/images/dashboard/home/Avatar.png";
import userTwo from "@/public/images/dashboard/home/Avatar-2.png";

const Dashboard = () => {
	const isAccountCreated = useSelector((state: IRootState) => state.init.isAccountCreated);

	const [isWelcomeNoteOpen, setIsWelcomeNoteOpen] = useState(true);

	return (
		<>
			<div className="flex h-full w-full">
				<div className="relative h-full w-full overflow-y-auto">
					<div className="absolute left-0 top-0 flex h-full w-full flex-col gap-8 px-4 py-6 xs:px-5">
						<div>
							<h3>Messages</h3>
							<SearchBar placeholder="Search" />
						</div>
						<div>
							<div>
								<Images />
							</div>
							<div></div>
						</div>
					</div>
				</div>
				<div className="relative h-full w-full overflow-y-auto">
					<div className="absolute left-0 top-0 flex h-full w-full flex-col gap-8 px-4 py-6 xs:px-5"></div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
