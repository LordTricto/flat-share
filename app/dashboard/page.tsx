"use client";

import {UserActivationStatus, UserType} from "@/models/user.constant";

import Arrow from "@/components/jsx-icons/arrow";
import Button from "@/components/general/button/button";
import {IRootState} from "@/redux/rootReducer";
import Image from "next/image";
import Loading from "./loading";
import asideSectionPattern from "@/public/images/dashboard/home/aside-section-pattern.png";
import emptyIcon from "@/public/images/dashboard/general/empty-list.svg";
import emptyProfileIcon from "@/public/images/dashboard/general/empty-profile.svg";
import {useSelector} from "react-redux";
import {useState} from "react";

const Dashboard = () => {
	const user = useSelector((state: IRootState) => state.init.user);
	const isAccountCreated = useSelector((state: IRootState) => state.init.isAccountCreated);

	const [isActivityEmpty] = useState(true);

	console.log(isAccountCreated);
	return (
		<>
			{!isAccountCreated && <Loading />}
			{isAccountCreated && (
				<div className="flex h-full w-full">
					{user?.account_status === UserActivationStatus.OFFLINE && user.user_type === UserType.HOST ? (
						<div className="h-full w-full"></div>
					) : (
						<div className="flex w-full flex-col items-center justify-center">hey</div>
					)}
					<div className="relative h-full min-w-[280px] bg-black-quat">
						<div className="absolute left-0 top-0 flex h-fit w-full flex-col gap-[42px] overflow-y-auto border-l border-grey-quat bg-white px-5 py-6">
							<div className="flex h-72 flex-grow flex-col gap-[42px]">
								<h4 className="text-lg font-semibold leading-[100%] text-black">Activities</h4>
								<div className="h-full w-full border-b border-grey-secondary">
									{isActivityEmpty ? (
										<>
											<div className="flex w-full flex-col items-center justify-center pt-8">
												<Image priority src={emptyIcon} alt="Empty state" />
												<p className="-mt-2.5 text-sm text-grey-quin">No activities to display</p>
											</div>
										</>
									) : (
										<></>
									)}
								</div>
							</div>
							<div className="flex h-80 flex-grow flex-col gap-[42px]">
								<h4 className="text-lg font-semibold leading-[100%] text-black">Recent Messages</h4>
								<div className="h-full w-full border-b border-grey-secondary">
									{isActivityEmpty ? (
										<>
											<div className="flex w-full flex-col items-center justify-center gap-1 pt-8">
												<Image priority src={emptyProfileIcon} alt="Empty state" />
												<p className="text-sm text-grey-quin">No conversation to display</p>
											</div>
										</>
									) : (
										<></>
									)}
								</div>
							</div>
							<div className="relative flex w-full flex-col gap-6 overflow-hidden rounded-[11px] px-6 py-3">
								<Image priority src={asideSectionPattern} className="absolute left-0 top-0 z-0 h-full w-full" alt="Empty state" />
								<h3 className="z-10 max-w-[190px] text-lg font-semibold text-white">Unlock more benefits and exclusive features.</h3>
								<Button type="button" buttonType="secondary" color="translucent" fullWidth borderFull>
									<div className="flex w-max flex-row items-center justify-center gap-1.5 pl-0.5">
										<span className="leading-none">Upgrade Account</span>
										<Arrow />
									</div>
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Dashboard;
