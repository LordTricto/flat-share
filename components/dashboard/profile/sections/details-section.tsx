"use client";

import Button from "@/components/general/button/button";
import Filter from "@/models/filter";
import HostTag from "@/components/dashboard/home/tags/host-tag";
import Image from "next/image";
import SendMessageModal from "../modals/send-message-modal";
import User from "@/models/user";
import {UserType} from "@/models/user.constant";
import ageIcon from "@/public/images/dashboard/profile/age.svg";
import budgetIcon from "@/public/images/dashboard/profile/budget.svg";
import editIcon from "@/public/images/dashboard/general/edit.svg";
import emailIcon from "@/public/images/dashboard/profile/email.svg";
import formatNumber from "@/utils/formatNumber";
import genderIcon from "@/public/images/dashboard/profile/gender.svg";
import locationIcon from "@/public/images/dashboard/profile/location.svg";
import lock from "@/public/images/dashboard/general/lock.svg";
import occupationIcon from "@/public/images/dashboard/profile/occupation.svg";
import phoneIcon from "@/public/images/dashboard/profile/phone.svg";
import religionIcon from "@/public/images/dashboard/profile/religion.svg";
import {setErrorMessage} from "@/redux/toast/slice/toast-slice";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import useSendRequest from "@/hooks/dashboard/requests/send-request/use-send-request";
import {useState} from "react";

interface Props {
	user: User;
	filter: Filter | null;
	isExplore?: boolean;
	canMessage?: boolean;
	canSendRequest?: boolean;
	//temp
	userId?: string;
}

function DetailsSection(props: Props) {
	const router = useRouter();
	const dispatch = useDispatch();

	const [isRequestSent, setIsRequestSent] = useState<boolean>(false);
	const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState<boolean>(false);

	const {mutate, isLoading} = useSendRequest({onComplete: () => setIsRequestSent(true)});

	const handlePromptToSubscribeForMessages = () => {
		dispatch(setErrorMessage("Subscribe to send more messages"));
	};
	const handlePromptToSubscribeForRequests = () => {
		dispatch(setErrorMessage("Subscribe to send more requests"));
	};
	const handleSendMessage = () => {
		setIsSendMessageModalOpen(true);
	};

	return (
		<>
			<SendMessageModal
				userId={props.userId || ""}
				active={isSendMessageModalOpen}
				toggler={() => {
					setIsSendMessageModalOpen(false);
				}}
			/>
			<div className="relative flex h-fit w-full flex-col gap-6 overflow-hidden rounded-[10px] border bg-white px-5 py-6 2xs:px-6">
				<div className="absolute left-0 top-0 h-[110px] w-full bg-grey-tertiary"></div>
				<div className="z-10 flex flex-col gap-6">
					<div className="flex flex-row items-start justify-between gap-4">
						<div>
							<div className="h-[120px] w-[120px] overflow-hidden rounded-full border border-grey-quat">
								<Image src={props.user.profile_photo_path} alt="camera" width={120} height={120} tabIndex={-1} />
							</div>
						</div>
						{props.isExplore ? (
							<div className="flex flex-row items-start justify-between gap-4">
								<Button
									type="button"
									buttonType="secondary"
									color="white"
									size="sm"
									onClick={props.canMessage ? handleSendMessage : handlePromptToSubscribeForMessages}
									borderSmall
								>
									<div className="flex items-center gap-2">
										{!props.canMessage && <Image src={lock} alt="lock icon" width={16} height={16} tabIndex={-1} />}
										<span className="inline">Message</span>
									</div>
								</Button>
								{isRequestSent ? (
									<div className="flex h-7 items-center justify-center rounded-md bg-orange-100 px-3">
										<span className="text-xs font-medium text-orange-500">Request Sent</span>
									</div>
								) : (
									<Button
										type="button"
										buttonType="primary"
										color="black"
										size="sm"
										onClick={props.canSendRequest ? () => mutate({id: props.userId || ""}) : handlePromptToSubscribeForRequests}
										isLoading={isLoading}
										borderSmall
									>
										<div className="flex items-center gap-2">
											{!props.canSendRequest && <Image src={lock} alt="lock icon" width={16} height={16} tabIndex={-1} />}
											<span className="inline">Send Request</span>
										</div>
									</Button>
								)}
							</div>
						) : (
							<Button
								type="button"
								buttonType="secondary"
								color="white"
								size="sm"
								onClick={() => router.push("/dashboard/settings")}
								borderSmall
							>
								<div className="flex items-center gap-2">
									<Image src={editIcon} alt="camera" width={16} height={16} tabIndex={-1} />
									<span className="hidden 2xs:inline">Edit My Profile</span>
									<span className="inline 2xs:hidden">Edit</span>
								</div>
							</Button>
						)}
					</div>
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-4">
							<h5 className="text-3xl font-semibold capitalize text-black 3xs:text-xl">
								{props.user.fname} {props.user.lname}
							</h5>
							<div className="hidden 2xs:block">
								<HostTag isHost={props.user.user_type === UserType.HOST} />
							</div>
						</div>
						<p className="text-left text-sm text-black-tertiary">{props.user.bio || "*Go to settings to complete profile"}</p>
					</div>
				</div>
				<div className="grid w-full grid-cols-1 gap-6 border-t border-grey-secondary pt-6 sm:grid-cols-2">
					<div className="flex w-full gap-9">
						<div className="flex w-full max-w-[142px] items-center gap-3">
							<div className="min-w-[20px]">
								<Image src={genderIcon} alt="camera" width={20} height={20} tabIndex={-1} />
							</div>
							<p className="text-sm text-black-tertiary 2xs:whitespace-nowrap">Gender</p>
						</div>
						<p className="w-full max-w-[55%] break-words break-all text-right text-sm font-medium capitalize text-black 2xs:text-left">
							{props.user.sex || "-"}
						</p>
					</div>
					<div className="flex w-full gap-9">
						<div className="flex w-full max-w-[142px] items-center gap-3">
							<div className="min-w-[20px]">
								<Image src={occupationIcon} alt="camera" width={20} height={20} tabIndex={-1} />
							</div>
							<p className="text-sm text-black-tertiary 2xs:whitespace-nowrap">Occupation</p>
						</div>
						<p className="w-full max-w-[55%] break-words break-all text-right text-sm font-medium capitalize text-black 2xs:text-left">
							{props.user.profession || "-"}
						</p>
					</div>
					<div className="flex w-full gap-9">
						<div className="flex w-full max-w-[142px] items-center gap-3">
							<div className="min-w-[20px]">
								<Image src={locationIcon} alt="camera" width={20} height={20} tabIndex={-1} />
							</div>
							<p className="text-sm text-black-tertiary 2xs:whitespace-nowrap">Preferred Location</p>
						</div>
						<p className="w-full max-w-[55%] break-words break-all text-right text-sm font-medium capitalize text-black 2xs:text-left sm:flex sm:items-center">
							{props.filter?.preferred_location_1 || ""}
						</p>
					</div>
					<div className="flex w-full gap-9">
						<div className="flex w-full max-w-[142px] items-center gap-3">
							<div className="min-w-[20px]">
								<Image src={budgetIcon} alt="camera" width={20} height={20} tabIndex={-1} />
							</div>
							<p className="text-sm text-black-tertiary 2xs:whitespace-nowrap">Budget</p>
						</div>
						<p className="w-full max-w-[55%] break-words break-all text-right text-sm font-medium capitalize text-black 2xs:text-left">
							{props.filter?.min_budget && props.filter?.max_budget ? (
								<>
									₦{formatNumber(props.filter?.min_budget)} - ₦{formatNumber(props.filter?.max_budget)}
								</>
							) : (
								"-"
							)}
						</p>
					</div>
					<div className="flex w-full gap-9">
						<div className="flex w-full max-w-[142px] items-center gap-3">
							<div className="min-w-[20px]">
								<Image src={religionIcon} alt="camera" width={20} height={20} tabIndex={-1} />
							</div>
							<p className="text-sm text-black-tertiary 2xs:whitespace-nowrap">Religion</p>
						</div>
						<p className="w-full max-w-[55%] break-words break-all text-right text-sm font-medium capitalize text-black 2xs:text-left">
							{props.user.religion || "-"}
						</p>
					</div>
					<div className="flex w-full gap-9">
						<div className="flex w-full max-w-[142px] items-center gap-3">
							<div className="min-w-[20px]">
								<Image src={emailIcon} alt="camera" width={20} height={20} tabIndex={-1} />
							</div>
							<p className="text-sm text-black-tertiary 2xs:whitespace-nowrap">Email Address</p>
						</div>
						<p className="w-full max-w-[55%] break-words break-all text-right text-sm font-medium capitalize text-black 2xs:text-left">
							{props.user.email || "-"}
						</p>
					</div>
					<div className="flex w-full gap-9">
						<div className="flex w-full max-w-[142px] items-center gap-3">
							<div className="min-w-[20px]">
								<Image src={ageIcon} alt="camera" width={20} height={20} tabIndex={-1} />
							</div>
							<p className="text-sm text-black-tertiary 2xs:whitespace-nowrap">Age</p>
						</div>
						<p className="w-full max-w-[55%] break-words break-all text-right text-sm font-medium capitalize text-black 2xs:text-left">
							{props.user.age || "-"}
						</p>
					</div>
					<div className="flex w-full gap-9">
						<div className="flex w-full max-w-[142px] items-center gap-3">
							<div className="min-w-[20px]">
								<Image src={phoneIcon} alt="camera" width={20} height={20} tabIndex={-1} />
							</div>
							<p className="text-sm text-black-tertiary 2xs:whitespace-nowrap">Phone Number</p>
						</div>
						<p className="w-full max-w-[55%] break-words break-all text-right text-sm font-medium capitalize text-black 2xs:text-left">
							{props.user.phone || "-"}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default DetailsSection;
