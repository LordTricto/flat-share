import Image, {StaticImageData} from "next/image";

import Button from "@/components/general/button/button";
import HostTag from "../tags/host-tag";
import React from "react";
import UserTag from "../tags/user-tag";
import lockIcon from "@/public/images/dashboard/general/lock.svg";

interface Props {
	name: string;
	bio: string;
	isLocked: boolean;
	isHost: boolean;
	religion: string;
	job: string;
	location: string;
	budget: string;
	profileImage: StaticImageData;
}

function UserCard(props: Props) {
	return (
		<>
			<div className="flex w-full flex-col gap-5 rounded-2xl border border-grey bg-white p-6">
				<div className="flex flex-col gap-3">
					<div className="flex gap-4">
						<Image src={props.profileImage} width={96} height={123} alt="user profile" tabIndex={-1} />
						<div className="flex flex-col gap-4">
							<h5 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-semibold capitalize leading-[100%] text-black 3xs:text-xl">
								{props.name}
							</h5>
							<div className="flex flex-col gap-2.5">
								<HostTag isHost={props.isHost} />
								<div className="flex gap-2.5">
									<UserTag colorClass="bg-green-100 text-green-500" text={props.religion} />
									<UserTag colorClass="bg-orange-100 text-orange-500" text={props.job} />
								</div>
								<UserTag colorClass="bg-gray-100 text-gray-500" text={props.location} />
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2.5">
							<h6 className="text-xs font-medium uppercase leading-[100%] text-black-quat">Bio</h6>
							<p className="two-lines-max text-sm text-black-secondary">{props.bio}</p>
						</div>
						<UserTag colorClass="bg-gray-100 text-black" text={`₦${props.budget}/yr`} />
					</div>
				</div>
				<div className="flex gap-3">
					<Button type="button" buttonType="secondary" color="grey" size="md" isDisabled={props.isLocked} borderSmall>
						<div className="flex items-center justify-center gap-1.5">
							{props.isLocked && <Image src={lockIcon} width={16} height={16} alt="locked icon" tabIndex={-1} />}
							<span>Message</span>
						</div>
					</Button>
					<Button type="button" buttonType="primary" color="black" size="md" borderSmall>
						<span>Send Request</span>
					</Button>
				</div>
			</div>
		</>
	);
}

export default UserCard;
