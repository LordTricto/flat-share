"use client";

import Button from "@/components/general/button/button";
import HostTag from "@/components/dashboard/home/tags/host-tag";
import {IRootState} from "@/redux/rootReducer";
import Image from "next/image";
import Loading from "./loading";
import NotificationBar from "@/components/dashboard/general/notification-bar/notification-bar";
import UserTag from "@/components/dashboard/home/tags/user-tag";
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

	console.log(isAccountCreated);
	return (
		<>
			{/* {!isAccountCreated && <Loading />} */}
			{/* {isAccountCreated && ( */}
			<div className="flex h-full w-full">
				<div className="relative h-full w-full overflow-y-auto">
					<div className="absolute left-0 top-0 flex h-full w-full flex-col gap-8 px-5 py-6">
						{isWelcomeNoteOpen && (
							<WelcomeCard
								subTitle="Begin your exploration and connect with potential flatmates to build meaningful relationships."
								ctaText="Start Exploring"
								toggle={() => setIsWelcomeNoteOpen(false)}
							/>
						)}

						<div className="flex h-fit w-full flex-col gap-8 pb-6">
							<div className="flex w-full flex-col gap-4">
								<h4 className="text-xl font-semibold leading-[100%] text-black-secondary">Your Requests</h4>
								<div className="flex w-full flex-col items-center justify-between gap-6 rounded-2xl border border-grey bg-white p-6">
									<div className="flex w-full items-center justify-between gap-6">
										<div className="flex gap-7">
											<div className="flex flex-col gap-3">
												<p className="text-xs uppercase leading-[100%] text-black-quat">Total Request sent</p>
												<span className="text-3xl font-semibold leading-[100%] text-black">5</span>
											</div>
											<div className="flex flex-col gap-3">
												<p className="text-xs uppercase leading-[100%] text-black-quat">Available Request</p>
												<span className="text-3xl font-semibold leading-[100%] text-black">10</span>
											</div>
										</div>
										<Button type="button" buttonType="secondary" color="grey" size="xs" borderSmall>
											<span>Manage Request</span>
										</Button>
									</div>
									{/* <div className="flex w-full items-center justify-between gap-10 divide-x divide-grey-secondary [&>*:not(:first-child)]:pl-10 "> */}
									<div className="flex w-full justify-start gap-10">
										<div className="flex w-full flex-col gap-3">
											<p className="text-xs uppercase leading-[100%] text-black-quat">Total Request sent</p>
											<div className="flex w-full flex-col gap-3">
												<div className="flex w-full items-center justify-between">
													<div className="flex items-center justify-center gap-4">
														<Image src={requestAvatarOne} width={28} height={28} alt="main background" tabIndex={-1} />
														<p className="text-sm text-black-secondary">John Doe</p>
													</div>
													<div className="flex gap-3">
														<Button type="button" buttonType="secondary" color="grey" size="xs" borderSmall>
															<span>Ignore</span>
														</Button>
														<Button type="button" buttonType="primary" color="black" size="xs" borderSmall>
															<span>Accept</span>
														</Button>
													</div>
												</div>
												<div className="flex w-full items-center justify-between">
													<div className="flex items-center justify-center gap-4">
														<Image src={requestAvatarTwo} width={28} height={28} alt="main background" tabIndex={-1} />
														<p className="text-sm text-black-secondary">Tiana Culhane</p>
													</div>
													<div className="flex gap-3">
														<Button type="button" buttonType="secondary" color="grey" size="xs" borderSmall>
															<span>Ignore</span>
														</Button>
														<Button type="button" buttonType="primary" color="black" size="xs" borderSmall>
															<span>Accept</span>
														</Button>
													</div>
												</div>
											</div>
										</div>
										<div className="flex-grow">
											<div className="flex h-full items-end justify-end">
												<div className="h-[68px] w-[1px] bg-grey-secondary"></div>
											</div>
										</div>
										<div className="flex w-full flex-col gap-3">
											<p className="text-xs uppercase leading-[100%] text-black-quat">Total Request sent</p>
											<div className="flex w-full flex-col gap-3">
												<div className="flex w-full items-center justify-between">
													<div className="flex items-center justify-center gap-4">
														<Image src={requestAvatarTwo} width={28} height={28} alt="main background" tabIndex={-1} />
														<p className="text-sm text-black-secondary">Jocelyn Culhane</p>
													</div>
													<div className="flex h-7 items-center justify-center rounded-md bg-orange-100 px-3">
														<span className="text-xs font-medium text-orange-500">Pending</span>
													</div>
												</div>
												<div className="flex w-full items-center justify-between">
													<div className="flex items-center justify-center gap-4">
														<Image src={requestAvatarOne} width={28} height={28} alt="main background" tabIndex={-1} />
														<p className="text-sm text-black-secondary">Carla Stanton</p>
													</div>
													<div className="flex h-7 items-center justify-center rounded-md bg-orange-100 px-3">
														<span className="text-xs font-medium text-orange-500">Pending</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="flex w-full flex-col gap-4">
								<h4 className="text-xl font-semibold leading-[100%] text-black-secondary">Suggested for You</h4>
								<div className="grid grid-cols-1 gap-5 2xs:grid-cols-2">
									<div className="flex w-full flex-col gap-5 rounded-2xl border border-grey bg-white p-6">
										<div className="flex flex-col gap-3">
											<div className="flex gap-4">
												<Image src={userOne} width={96} height={123} alt="user profile" tabIndex={-1} />
												<div className="flex flex-col gap-4">
													<h5 className="text-xl font-semibold leading-[100%] text-black">Kianna Botosh</h5>
													<div className="flex flex-col gap-2.5">
														<HostTag />
														<div className="flex gap-2.5">
															<UserTag colorClass="bg-green-100 text-green-500" text="Muslim" />
															<UserTag colorClass="bg-orange-100 text-orange-500" text="Data Analyst" />
														</div>
														<UserTag colorClass="bg-gray-100 text-gray-500" text="Agric Rd - Ikorodu" />
													</div>
												</div>
											</div>
											<div className="flex flex-col gap-4">
												<div className="flex flex-col gap-2.5">
													<h6 className="text-xs font-medium uppercase leading-[100%] text-black-quat">Bio</h6>
													<p className="two-lines-max text-sm text-black-secondary">
														Curious explorer, coffee aficionado, and avid bookworm with a passion for unraveling
														mysteries.
													</p>
												</div>
												<UserTag colorClass="bg-gray-100 text-black" text="₦500,000/yr" />
											</div>
										</div>
										<div className="flex gap-3">
											<Button type="button" buttonType="secondary" color="grey" size="md" borderSmall>
												<span>Message</span>
											</Button>
											<Button type="button" buttonType="primary" color="black" size="md" borderSmall>
												<span>Send Request</span>
											</Button>
										</div>
									</div>
									<div className="flex w-full flex-col gap-5 rounded-2xl border border-grey bg-white p-6">
										<div className="flex flex-col gap-3">
											<div className="flex gap-4">
												<Image src={userTwo} width={96} height={123} alt="user profile" tabIndex={-1} />
												<div className="flex flex-col gap-4">
													<h5 className="text-xl font-semibold leading-[100%] text-black">Amanda Smith</h5>
													<div className="flex flex-col gap-2.5">
														<HostTag />
														<div className="flex gap-2.5">
															<UserTag colorClass="bg-green-100 text-green-500" text="Christian" />
															<UserTag colorClass="bg-orange-100 text-orange-500" text="DevOps" />
														</div>
														<UserTag colorClass="bg-gray-100 text-gray-500" text="Ibeju Lekki" />
													</div>
												</div>
											</div>
											<div className="flex flex-col gap-4">
												<div className="flex flex-col gap-2.5">
													<h6 className="text-xs font-medium uppercase leading-[100%] text-black-quat">Bio</h6>
													<p className="two-lines-max text-sm text-black-secondary">
														Short in stature but big in heart, always finding joy in life&apos;s little moments. Avid
														developer, coffee enthusiast, and aspiring poet.
													</p>
												</div>
												<UserTag colorClass="bg-gray-100 text-black" text="₦250,000/yr" />
											</div>
										</div>
										<div className="flex gap-3">
											<Button type="button" buttonType="secondary" color="grey" size="md" borderSmall>
												<span>Message</span>
											</Button>
											<Button type="button" buttonType="primary" color="black" size="md" borderSmall>
												<span>Send Request</span>
											</Button>
										</div>
									</div>
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
