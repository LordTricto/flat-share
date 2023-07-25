"use client";

import React, {useState} from "react";

import Arrow from "@/components/jsx-icons/arrow";
import Button from "@/components/general/button/button";
import Image from "next/image";
import UserActivity from "./components/user-activity";
import UserMessage from "./components/user-message";
import asideSectionPattern from "@/public/images/dashboard/home/aside-section-pattern.png";
import emptyIcon from "@/public/images/dashboard/general/empty-list.svg";
import emptyProfileIcon from "@/public/images/dashboard/general/empty-profile.svg";
import requestAvatarOne from "@/public/images/dashboard/home/request-1.png";
import requestAvatarTwo from "@/public/images/dashboard/home/request-2.png";

function NotificationBar() {
	const [isActivityEmpty] = useState(false);

	return (
		<>
			<div className="hidden h-full min-w-[280px] overflow-y-auto lg:relative lg:block">
				<div className="absolute left-0 top-0 flex h-fit w-full flex-col gap-[42px] overflow-y-auto border-l border-grey-quat bg-white px-5 py-6">
					<div className={"flex flex-grow flex-col gap-[42px] " + `${isActivityEmpty ? "h-72" : "h-fit"}`}>
						<h4 className="text-base font-semibold leading-[100%] text-black">Activities</h4>
						<div className="h-full w-full border-b border-grey-secondary">
							{isActivityEmpty ? (
								<div className="flex w-full flex-col items-center justify-center pt-8">
									<Image priority src={emptyIcon} alt="Empty state" />
									<p className="-mt-2.5 text-xs text-grey-quin">No activities to display</p>
								</div>
							) : (
								<div className="flex w-full flex-col divide-y divide-grey-secondary [&>*:not(:first-child)]:pt-3 [&>*]:pb-3">
									<UserActivity name="John Doe" profileImage={requestAvatarOne} time="5 mins" isLike />
									<UserActivity name="Justin Passaquindici" profileImage={requestAvatarTwo} time="5 mins" isLike />
									<UserActivity
										name="John Doe"
										profileImage={requestAvatarOne}
										time="10 mins"
										isLike={false}
										comment="Please follow back and check your DM."
									/>
								</div>
							)}
						</div>
					</div>
					<div className={"flex flex-grow flex-col gap-[42px] " + `${isActivityEmpty ? "h-80" : "h-fit"}`}>
						<div className="flex w-full items-center justify-between">
							<h4 className="text-base font-semibold leading-[100%] text-black">Recent Messages</h4>
							<Button type="button" buttonType="tertiary" color="blue" size="xs">
								<span className="uppercase">view all</span>
							</Button>
						</div>
						<div className="h-full w-full border-b border-grey-secondary">
							{isActivityEmpty ? (
								<div className="flex w-full flex-col items-center justify-center gap-1 pt-8">
									<Image priority src={emptyProfileIcon} alt="Empty state" />
									<p className="text-xs text-grey-quin">No conversation to display</p>
								</div>
							) : (
								<div className="flex w-full flex-col divide-y divide-grey-secondary [&>*:not(:first-child)]:pt-3 [&>*]:pb-3">
									<UserMessage
										name="Jocelyn Curtis"
										profileImage={requestAvatarOne}
										time="5 mins"
										message="Hello Ruth, please do you have any idea where the water is placed in the school"
										messageNo="2"
									/>
									<UserMessage
										name="Justin Passaquindici"
										profileImage={requestAvatarOne}
										time="10 mins"
										message="Thanks for the feedback. 🙏"
										messageNo="3"
									/>
									<UserMessage
										name="Nolan Press"
										profileImage={requestAvatarOne}
										time="2 hrs"
										message="I think this is a lot better."
										messageNo="1"
									/>
								</div>
							)}
						</div>
					</div>
					<div className="relative flex w-full flex-col gap-6 overflow-hidden rounded-[11px] px-6 py-3">
						<Image priority src={asideSectionPattern} className="absolute left-0 top-0 z-0 h-full w-full" alt="Empty state" />
						<h3 className="z-10 max-w-[190px] text-base font-semibold text-white">Unlock more benefits and exclusive features.</h3>
						<Button type="button" buttonType="secondary" color="translucent" size="sm" fullWidth borderFull>
							<div className="flex w-max flex-row items-center justify-center gap-1.5 pl-0.5">
								<span className="text-sm leading-none">Upgrade Account</span>
								<Arrow />
							</div>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}

export default NotificationBar;
