import Image, {StaticImageData} from "next/image";
import {UserReligion, UserSex} from "@/models/user.constant";

import Button from "@/components/general/button/button";
import React from "react";
import blueArrow from "@/public/images/dashboard/general/blue-arrow.svg";
import eyesIcon from "@/public/images/dashboard/home/white-eyes.svg";
import femaleIcon from "@/public/images/dashboard/general/female-gender.svg";
import formatNumber from "@/utils/formatNumber";
import hostIcon from "@/public/images/dashboard/home/white-host.svg";
import locationIcon from "@/public/images/dashboard/general/location-pin.svg";
import moneyIcon from "@/public/images/dashboard/home/white-money.svg";
import {useRouter} from "next/navigation";

interface Props {
	id: string;
	name: string;
	bio: string;
	isLocked: boolean;
	isHost: boolean;
	religion: UserReligion | null;
	gender: UserSex | null;
	job: string;
	location: string;
	budget: string;
	profileImage: StaticImageData | string;
	views: number;
}

function UserCard(props: Props) {
	const router = useRouter();

	return (
		<>
			<div className="flex w-full flex-col gap-5 rounded-2xl border border-grey bg-white p-6">
				<div className="flex w-full flex-col gap-3">
					<div className="flex w-full gap-4">
						{/* <div className="relative flex aspect-[16/10] w-full flex-col gap-4 overflow-hidden"> */}
						<div className="relative flex h-0 w-full flex-col gap-4 overflow-hidden rounded-xl pb-[62.5%]">
							<Image
								className="absolute left-0 top-0 z-10 h-full w-full"
								fill
								src={props.profileImage}
								alt="user profile"
								tabIndex={-1}
							/>
							<div className="absolute bottom-0 left-0 z-20 flex w-full flex-col justify-end gap-2 bg-gradient-user-card p-4">
								<h6 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-semibold capitalize leading-[100%] text-white 3xs:text-xl">
									{props.name}
								</h6>
								<div className="flex items-center gap-2">
									<Image className="h-3 w-3 xs:h-4 xs:w-4" src={hostIcon} alt="host icon" tabIndex={-1} />
									<span className="text-xs text-white">{props.isHost ? "Host" : "Flatmate"}</span>
								</div>
								<div className="flex w-full items-center justify-between">
									<div className="flex items-center gap-2">
										<Image className="h-3 w-3 xs:h-4 xs:w-4" src={moneyIcon} alt="money icon" tabIndex={-1} />
										<span className="text-xs text-white">₦{formatNumber(props.budget)}/yr</span>
									</div>
									<div className="flex items-center gap-2">
										<Image className="h-3 w-3 xs:h-4 xs:w-4" src={eyesIcon} alt="eyes icon" tabIndex={-1} />
										<span className="text-xs text-white">{props.views}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-4">
						<div className="flex w-full items-center gap-2.5">
							<div className="flex items-center gap-2">
								<Image className="h-4 w-4 xs:h-5 xs:w-5" src={femaleIcon} alt="gender icon" tabIndex={-1} />
								<span className="text-xs capitalize text-black-secondary">{props.gender}</span>
							</div>
							<div className="flex items-center gap-2">
								<Image className="h-4 w-4 xs:h-5 xs:w-5" src={locationIcon} alt="location icon" tabIndex={-1} />
								<span className="text-xs text-black-secondary">{props.location}</span>
							</div>
						</div>
						<p className="two-lines-max text-sm text-black-secondary">{props.bio}</p>
						<div className="flex w-full justify-end py-2">
							<Button
								type="button"
								buttonType="tertiary"
								color="blue"
								size="md"
								onClick={() =>
									router.push(
										`/dashboard/explore/${props.id
											.split("")
											.filter((_) => _ !== "=")
											.join("")}`
									)
								}
							>
								<div className="flex items-center gap-1.5">
									<span className="font-medium">View Profile</span>
									<Image src={blueArrow} alt="blue arrow" tabIndex={-1} />
								</div>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default UserCard;
