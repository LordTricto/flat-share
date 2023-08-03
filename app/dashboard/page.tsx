"use client";

import {UserReligion, UserSex, UserType} from "@/models/user.constant";
import {useLayoutEffect, useState} from "react";

import Button from "@/components/general/button/button";
import {IRootState} from "@/redux/rootReducer";
import Loading from "./loading";
import NotificationBar from "@/components/dashboard/general/notification-bar/notification-bar";
import UserCard from "@/components/dashboard/home/cards/user-card";
import UserRequest from "@/components/dashboard/home/cards/user-request";
import WelcomeCard from "@/components/dashboard/general/cards/welcome-card/welcome-card";
import useFilter from "@/hooks/dashboard/filter/use-filter";
import useMainInit from "@/hooks/dashboard/main-init/use-main-init";
import {useSelector} from "react-redux";
import userOne from "@/public/images/dashboard/home/Avatar.png";
import userTwo from "@/public/images/dashboard/home/Avatar-2.png";

const Dashboard = () => {
	const {data, isFetching, refetch} = useMainInit();
	const {data: suggestions, mutate} = useFilter();
	const user = useSelector((state: IRootState) => state.init.user);
	const filter = useSelector((state: IRootState) => state.init.filter);
	const [isWelcomeNoteOpen, setIsWelcomeNoteOpen] = useState(true);

	useLayoutEffect(() => {
		if (user && filter) {
			mutate({
				filter_gender: filter.preferred_sex || UserSex.MALE,
				filter_age_range_1: filter.preferred_first_age_range || 18,
				// filter_age_range_2: filter.preferred_second_age_range || 65,
				filter_age_range_2: 65,
				filter_preferred_user_type: UserType.HOST_HUNTERS,
				// filter_preferred_user_type: filter.preferred_user_type || UserType.HOST,
				filter_min_budget: filter.min_budget || 0,
				filter_max_budget: 5000000,
				// filter_max_budget: filter.max_budget || 0,
				filter_religion: filter.preferred_religion || UserReligion.OTHERS,
				filter_state: filter.state_of_interest || "",
				filter_location_1: filter.preferred_location_1 || "",
				filter_location_2: filter.preferred_location_2 || "",
				filter_education: filter.preferred_education || "",
			});
			refetch();
		}
	}, [user, filter, refetch, mutate]);

	console.log(filter);
	console.log(data, suggestions);

	return (
		<>
			{(isFetching || !data) && <Loading />}
			{!isFetching && data && (
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
													<p className="text-[10px] uppercase leading-[100%] text-black-quat xs:text-xs">
														Total Request sent
													</p>
													<span className="text-2xl font-semibold leading-[100%] text-black xs:text-3xl">
														{data.sent_request.sent_request_no}
													</span>
												</div>
												<div className="flex flex-col gap-3">
													<p className="text-[10px] uppercase leading-[100%] text-black-quat xs:text-xs">
														Available Request
													</p>
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
												<p className="text-[10px] uppercase leading-[100%] text-black-quat sm:text-xs">Request received</p>
												<div className="flex w-full flex-col gap-3">
													{data.received_request.received_request_data.map((_request, index) => (
														<UserRequest key={index} name={_request.fullname} profileImage={_request.photo} />
													))}
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
													{data.sent_request.sent_request_data.map((_request, index) => (
														<UserRequest key={index} name={_request.fullname} profileImage={_request.photo} isPending />
													))}
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
										{suggestions &&
											suggestions.suggestions.map((_user, index) => (
												<UserCard
													key={index}
													job={_user.profession || ""}
													bio={_user.bio}
													name={_user.fullname}
													budget={_user.budget}
													location={`${_user.location_1}${_user.location_2 ? ` - ${_user.location_2}` : ""}`}
													isLocked={true}
													religion={_user.religion}
													profileImage={_user.photo}
													isHost={_user.user_type === UserType.HOST}
												/>
											))}

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
			)}
		</>
	);
};

export default Dashboard;
