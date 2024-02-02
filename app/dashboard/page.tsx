"use client";

import {useLayoutEffect, useState} from "react";

import Button from "@/components/general/button/button";
import {IRootState} from "@/redux/rootReducer";
import Loading from "./loading";
import ManageRequestsModal from "@/components/dashboard/general/notification-bar/components/modals/manage-requests-modal";
import NotificationBar from "@/components/dashboard/general/notification-bar/notification-bar";
import ProfileViewsModal from "@/components/dashboard/general/notification-bar/components/modals/profile-views-modal";
import UserCard from "@/components/dashboard/home/cards/user-card";
import UserRequest from "@/components/dashboard/home/cards/user-request";
import {UserType} from "@/models/user.constant";
import WelcomeCard from "@/components/dashboard/general/cards/welcome-card/welcome-card";
import {accountSetupProgress} from "@/helpers/isAccountSetup";
// import requestAvatarOne from "@/public/images/dashboard/home/request-1.png";
import useMainInit from "@/hooks/dashboard/main-init/use-main-init";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";

const Dashboard = () => {
	const router = useRouter();
	const {data, isFetching, refetch, remove} = useMainInit();

	const user = useSelector((state: IRootState) => state.init.user);

	const [isWelcomeNoteOpen, setIsWelcomeNoteOpen] = useState(true);
	const [isProfileViewsModalOpen, setIsProfileViewsModalOpen] = useState<boolean>(false);
	const [isManageRequestsModalOpen, setIsManageRequestsModalOpen] = useState<boolean>(false);

	useLayoutEffect(() => {
		if (user) {
			refetch();
		}
		return () => {
			remove();
		};
	}, [user, refetch, remove]);

	return (
		<>
			{isFetching && <Loading />}
			{!isFetching && data && (
				<>
					<ManageRequestsModal
						active={isManageRequestsModalOpen}
						toggler={() => {
							setIsManageRequestsModalOpen(false);
						}}
					/>
					<ProfileViewsModal
						active={isProfileViewsModalOpen}
						toggler={() => {
							setIsProfileViewsModalOpen(false);
						}}
					/>

					<div className="flex h-full w-full">
						<div className="relative h-full w-full overflow-y-auto">
							<div className="absolute left-0 top-0 flex h-full w-full flex-col gap-8 px-4 py-6 xs:px-5">
								{isWelcomeNoteOpen && (
									<WelcomeCard
										subTitle={
											accountSetupProgress().isAccountSetupCompleted
												? "Begin your exploration and connect with potential flatmates to build meaningful relationships."
												: "Customize your experience by providing your personal information, preference and interests."
										}
										ctaText={accountSetupProgress().isAccountSetupCompleted ? "Start Exploring" : "Go to Settings"}
										toggle={() => setIsWelcomeNoteOpen(false)}
										handleCta={() => router.push("/dashboard/settings")}
										canToggle={accountSetupProgress().isAccountSetupCompleted}
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
														<span className="text-2xl font-semibold leading-[100%] text-black xs:text-3xl">
															{data.user_statistics.available_send_request}
														</span>
													</div>
												</div>
												<div className="hidden xs:block">
													<Button
														type="button"
														buttonType="secondary"
														color="grey"
														size="xs"
														onClick={() => setIsManageRequestsModalOpen(true)}
														borderSmall
													>
														<span>Manage Request</span>
													</Button>
												</div>
											</div>
											<div
												className={
													"flex w-full justify-start gap-6 sm:flex-row sm:gap-10 lg:gap-6 xl:flex-row xl:gap-10 " +
													`${
														data.received_request.received_request_data.length > 0 &&
														data.sent_request.sent_request_data.length > 0
															? "flex-col lg:flex-col"
															: ""
													}`
												}
											>
												<div className="flex w-full flex-col gap-3">
													<p className="text-[10px] uppercase leading-[100%] text-black-quat sm:text-xs">
														Request received
													</p>
													{data.received_request.received_request_data.length > 0 && (
														<div className="flex w-full flex-col gap-3">
															{data.received_request.received_request_data.map((_request, index) => (
																<UserRequest key={index} name={_request.fullname} profileImage={_request.photo} />
															))}
														</div>
													)}
													{/* <UserRequest name="John Doe sdadadssdadsasd" profileImage={requestAvatarOne} /> */}
												</div>
												{data.received_request.received_request_data.length > 0 &&
													data.sent_request.sent_request_data.length > 0 && (
														<div className="sm:flex-grow lg:flex-grow-0 xl:flex-grow">
															<div className="flex h-full items-end justify-end">
																<div className="h-[1px] w-full bg-grey-secondary sm:h-[68px] sm:w-[1px] lg:h-[1px] lg:w-full xl:h-[68px] xl:w-[1px]"></div>
															</div>
														</div>
													)}
												<div className="flex w-full flex-col gap-3">
													<p className="text-[10px] uppercase leading-[100%] text-black-quat sm:text-xs">Request sent</p>
													{data.sent_request.sent_request_data.length > 0 && (
														<div className="flex w-full flex-col gap-3">
															{data.sent_request.sent_request_data.map((_request, index) => (
																<UserRequest
																	key={index}
																	name={_request.fullname}
																	profileImage={_request.photo}
																	isPending
																/>
															))}
														</div>
													)}
												</div>
											</div>
											<div className="flex w-full xs:hidden">
												<Button
													type="button"
													buttonType="secondary"
													color="grey"
													size="xs"
													onClick={() => setIsManageRequestsModalOpen(true)}
													borderSmall
												>
													<span>Manage Request</span>
												</Button>
											</div>
										</div>
									</div>
									<div className="flex w-full flex-col gap-4">
										<div className="flex w-full items-center justify-between">
											<h4 className="text-lg font-semibold leading-[100%] text-black-secondary 3xs:text-xl">
												Suggested for You
											</h4>
											<Button
												type="button"
												buttonType="tertiary"
												color="blue"
												size="xs"
												onClick={() => router.push("/dashboard/explore")}
											>
												<span className="text-[10px] uppercase 3xs:text-xs">see more</span>
											</Button>
										</div>
										<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
											{data.suggestions &&
												data.suggestions.map((_user, index) => (
													<UserCard
														id={_user.codec || ""}
														key={index}
														job={_user.profession || ""}
														bio={_user.bio}
														name={_user.fullname}
														budget={_user.budget}
														location={`${_user.location_1}${_user.location_2 ? ` - ${_user.location_2}` : ""}`}
														isLocked={true}
														religion={_user.religion}
														gender={_user.gender}
														profileImage={_user.photo}
														isHost={_user.user_type === UserType.HOST}
														views={_user.views}
													/>
												))}

											{/* <UserCard
											job="Data Analyst"
											bio="Curious explorer, coffee aficionado, and avid bookworm with a passion for unraveling mysteries."
											name="Kianna Botosh"
											budget="250,000"
											location="Agric Rd - Ikorodu"
											isLocked={true}
											religion={UserReligion.ISLAM}
											profileImage={userThree}
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
											profileImage={userFour}
											isHost
										/> */}
										</div>
									</div>
								</div>
							</div>
						</div>
						<NotificationBar data={data} onViewAllViews={() => setIsProfileViewsModalOpen(true)} />
					</div>
				</>
			)}
		</>
	);
};

export default Dashboard;
