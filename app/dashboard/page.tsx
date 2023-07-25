"use client";

import Button from "@/components/general/button/button";
import {IRootState} from "@/redux/rootReducer";
import NotificationBar from "@/components/dashboard/general/notification-bar/notification-bar";
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
			{/* {!isAccountCreated && <Loading />} */}
			{/* {isAccountCreated && ( */}
			<div className="flex h-full w-full">
				<div className="relative h-full w-full overflow-y-auto">
					<div className="absolute left-0 top-0 flex h-full w-full flex-col gap-8 px-4 py-6 xs:px-5">
						{isWelcomeNoteOpen && (
							<WelcomeCard
								subTitle="Begin your exploration and connect with potential flatmates to build meaningful relationships."
								ctaText="Start Exploring"
								toggle={() => setIsWelcomeNoteOpen(false)}
							/>
						)}

						<div className="flex h-fit w-full flex-col gap-8 pb-6">
							<div className="flex w-full flex-col gap-4">
								<h4 className="text-lg font-semibold leading-[100%] text-black-secondary 3xs:text-xl">Your Requests</h4>
								<div className="flex w-full flex-col items-center justify-between gap-6 rounded-2xl border border-grey bg-white p-6">
									<div className="flex w-full items-start justify-between gap-6">
										<div className="flex gap-7">
											<div className="flex flex-col gap-3">
												<p className="text-[10px] uppercase leading-[100%] text-black-quat xs:text-xs">Total Request sent</p>
												<span className="text-2xl font-semibold leading-[100%] text-black xs:text-3xl">5</span>
											</div>
											<div className="flex flex-col gap-3">
												<p className="text-[10px] uppercase leading-[100%] text-black-quat xs:text-xs">Available Request</p>
												<span className="text-2xl font-semibold leading-[100%] text-black xs:text-3xl">10</span>
											</div>
										</div>
										<div className="hidden xs:block">
											<Button type="button" buttonType="secondary" color="grey" size="xs" borderSmall>
												<span>Manage Request</span>
											</Button>
										</div>
									</div>
									<div className="flex w-full flex-col justify-start gap-6 sm:flex-row sm:gap-10 lg:flex-col lg:gap-6 xl:flex-row xl:gap-10">
										<div className="flex w-full flex-col gap-3">
											<p className="text-[10px] uppercase leading-[100%] text-black-quat sm:text-xs">Total Request sent</p>
											<div className="flex w-full flex-col gap-3">
												<UserRequest name="John Doe" profileImage={requestAvatarOne} />
												<UserRequest name="Tiana Culhanea" profileImage={requestAvatarTwo} />
											</div>
										</div>
										<div className="sm:flex-grow lg:flex-grow-0 xl:flex-grow">
											<div className="flex h-full items-end justify-end">
												<div className="h-[1px] w-full bg-grey-secondary sm:h-[68px] sm:w-[1px] lg:h-[1px] lg:w-full xl:h-[68px] xl:w-[1px]"></div>
											</div>
										</div>
										<div className="flex w-full flex-col gap-3">
											<p className="text-[10px] uppercase leading-[100%] text-black-quat sm:text-xs">Total Request sent</p>
											<div className="flex w-full flex-col gap-3">
												<UserRequest name="Jocelyn Culhane" profileImage={requestAvatarTwo} isPending />
												<UserRequest name="Carla Stanton" profileImage={requestAvatarOne} isPending />
											</div>
										</div>
									</div>
									<div className="flex w-full xs:hidden">
										<Button type="button" buttonType="secondary" color="grey" size="xs" borderSmall>
											<span>Manage Request</span>
										</Button>
									</div>
								</div>
							</div>
							<div className="flex w-full flex-col gap-4">
								<div className="flex w-full items-center justify-between">
									<h4 className="text-lg font-semibold leading-[100%] text-black-secondary 3xs:text-xl">Suggested for You</h4>
									<Button type="button" buttonType="tertiary" color="blue" size="xs">
										<span className="text-[10px] uppercase 3xs:text-xs">see more</span>
									</Button>
								</div>
								<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
									<UserCard
										job="Data Analyst"
										bio="Curious explorer, coffee aficionado, and avid bookworm with a passion for unraveling mysteries."
										name="Kianna Botosh"
										budget="250,000"
										location="Agric Rd - Ikorodu"
										isLocked={true}
										religion={UserReligion.ISLAM}
										profileImage={userOne}
										isHost={false}
									/>

									<UserCard
										job="DevOps"
										bio="Short in stature but big in heart, always finding joy in life's little moments. Avid developer, coffee enthusiast, and aspiring poet."
										name="Amanda Smit"
										budget="250,000"
										location="Ibeju Lekki"
										isLocked={false}
										religion={UserReligion.CHRISTIANITY}
										profileImage={userTwo}
										isHost
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<NotificationBar />
			</div>
			{/* )} */}
		</>
	);
};

export default Dashboard;
