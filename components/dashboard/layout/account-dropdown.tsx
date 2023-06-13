"use client";

import {apartmentTypeOptions} from "@/app/find-a-home/find-a-home.constant";
import Dropdown from "@/components/general/dropdown/dropdown";
import userProfile from "@/public/images/icons/user-profile.svg";
import Image from "next/image";

import React from "react";

function AccountDropdown() {
	return (
		<>
			<Dropdown
				value={undefined}
				size="fit"
				customHead={
					<div className="max-w-9 flex w-full flex-row items-center justify-between">
						<div>
							<Image priority src={userProfile} width={40} height={40} alt="user" />
						</div>

						<div className=" w-full overflow-hidden overflow-ellipsis whitespace-nowrap px-2 subpixel-antialiased">
							<div className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
								<div className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap font-medium text-black">Roger Dokidis</div>
								<div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-normal text-black-tertiary">
									rogerdokidis@gmail.com
								</div>
							</div>
						</div>
					</div>
				}
				customHeadStyle="!px-3 !rounded-2xl "
				onSelect={() => {
					return;
				}}
				// placeholder={"All Types"}
				options={apartmentTypeOptions}
			/>
		</>
	);
}

export default AccountDropdown;
