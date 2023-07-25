"use client";

import Dropdown from "@/components/general/dropdown/dropdown";
import {IRootState} from "@/redux/rootReducer";
import Image from "next/image";
import React from "react";
import {accountTypeOptions} from "@/hooks/dashboard/general/general.constants";
// import {apartmentTypeOptions} from "@/app/find-a-home/find-a-home.constant";
import useDimension from "@/helpers/useDimension";
import useLogout from "@/hooks/dashboard/general/use-logout";
import {useSelector} from "react-redux";
import userProfile from "@/public/images/dashboard/sections/profile/profile-inactive.png";

function AccountDropdown() {
	const user = useSelector((state: IRootState) => state.init.user);
	const {width} = useDimension();
	const {mutate} = useLogout();

	return (
		<>
			<Dropdown
				value={undefined}
				size="fit"
				customHead={
					<div className="flex max-w-xs flex-row items-center justify-between xs:w-40">
						<div>
							<Image
								priority
								className="rounded-full"
								src={user ? user.profile_photo_path : userProfile}
								width={40}
								height={40}
								alt="user"
							/>
						</div>

						<div className="hidden w-full overflow-hidden overflow-ellipsis whitespace-nowrap px-2 subpixel-antialiased xs:block">
							<div className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
								<div className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-medium text-black">
									{user?.fname || ""} {user?.lname || ""}
								</div>
								<div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xs font-normal text-black-tertiary">
									{user?.email || ""}
								</div>
							</div>
						</div>
					</div>
				}
				customHeadStyle="!p-0 xs:!py-3 xs:!px-3 xs:!rounded-2xl"
				onSelect={(_value) => {
					if (_value === 2) {
						mutate();
					}
					return;
				}}
				options={accountTypeOptions}
				noArrow={width < 541}
				noBorder={width < 541}
				fitWidth={width < 541}
				placement="right"
			/>
		</>
	);
}

export default AccountDropdown;
