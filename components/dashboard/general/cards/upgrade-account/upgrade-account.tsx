import Arrow from "@/components/jsx-icons/arrow";
import Button from "@/components/general/button/button";
import Image from "next/image";
import React from "react";
import asideSectionPattern from "@/public/images/dashboard/home/aside-section-pattern.png";

function UpgradeAccountCard() {
	return (
		<>
			<div>
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
		</>
	);
}

export default UpgradeAccountCard;
