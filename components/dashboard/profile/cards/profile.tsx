"use client";

import Button from "@/components/general/button/button";
import HostTag from "../../home/tags/host-tag";
import {IRootState} from "@/redux/rootReducer";
import Image from "next/image";
import UserTag from "../../home/tags/user-tag";
import {UserType} from "@/models/user.constant";
import ageIcon from "@/public/images/dashboard/profile/age.svg";
import editIcon from "@/public/images/dashboard/general/edit.svg";
import emailIcon from "@/public/images/dashboard/profile/email.svg";
import genderIcon from "@/public/images/dashboard/profile/gender.svg";
import phoneIcon from "@/public/images/dashboard/profile/phone.svg";
import {useSelector} from "react-redux";

interface Props {
	handleEditProfile: () => void;
}

function ProfileCard(props: Props) {
	const user = useSelector((state: IRootState) => state.init.user);

	return (
		<>
			{user && (
				<div className="flex h-full w-full">
					<div className="h-fit w-full pb-6">
						<div className="relative flex h-fit w-full flex-col gap-6 overflow-hidden rounded-[10px] border bg-white px-5 py-6 2xs:px-6">
							<div className="absolute left-0 top-0 h-[110px] w-full bg-grey-tertiary"></div>
							<div className="z-10 flex flex-col gap-6">
								<div className="flex flex-row items-start justify-between gap-4">
									<div>
										<div className="h-[120px] w-[120px] overflow-hidden rounded-full border border-grey-quat">
											<Image src={user.profile_photo_path} alt="camera" width={120} height={120} tabIndex={-1} />
										</div>
									</div>
									<Button
										type="button"
										buttonType="secondary"
										color="white"
										size="sm"
										onClick={props.handleEditProfile}
										borderSmall
									>
										<div className="flex items-center gap-2">
											<Image src={editIcon} alt="camera" width={16} height={16} tabIndex={-1} />
											<span className="hidden 2xs:inline">Edit Details</span>
											<span className="inline 2xs:hidden">Edit</span>
										</div>
									</Button>
								</div>
								<div className="flex flex-col gap-4">
									<div className="flex items-center gap-4">
										<h5 className="text-3xl font-semibold capitalize text-black 3xs:text-xl">
											{user?.fname} {user?.lname}
										</h5>
										<div className="hidden 2xs:block">
											<HostTag isHost={user.user_type === UserType.HOST} />
										</div>
									</div>
									<p className="text-left text-sm text-black-tertiary">{user?.bio}</p>
									<div className="flex w-full flex-wrap gap-4">
										<div className="block 2xs:hidden">
											<HostTag isHost={user.user_type === UserType.HOST} />
										</div>
										<UserTag colorClass="bg-green-100 text-green-500" text={user.religion || ""} />
										<UserTag colorClass="bg-orange-100 text-orange-500" text={user.profession || ""} />
										<UserTag colorClass="bg-gray-100 text-gray-500" text={"Agric Rd - Ikorodu"} />
										<UserTag colorClass="bg-gray-100 text-gray-500" text={`₦3000,000/yr`} />
									</div>
								</div>
							</div>
							<div className="flex w-full flex-col gap-6 border-t border-grey-secondary pt-6">
								<div className="flex w-full gap-9">
									<div className="flex w-full max-w-[142px] items-center gap-3">
										<div className="min-w-[20px]">
											<Image src={genderIcon} alt="camera" width={20} height={20} tabIndex={-1} />
										</div>
										<p className="text-sm text-black-tertiary 2xs:whitespace-nowrap">Gender</p>
									</div>
									<p className="w-full max-w-[55%] break-words break-all text-right text-sm font-medium capitalize text-black 2xs:text-left">
										{user.sex}
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
										{user.age}
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
										{user.email}
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
										{user.phone}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default ProfileCard;
