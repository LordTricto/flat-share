"use client";

import Button from "@/components/general/button/button";
import Cancel from "@/components/jsx-icons/cancel";
import Image from "next/image";
import React from "react";
import mainSectionPattern from "@/public/images/dashboard/home/main-section-pattern.png";

interface Props {
	subTitle: string;
	ctaText: string;
	toggle: () => void;
}

function WelcomeCard(props: Props) {
	return (
		<>
			<div>
				<div className="relative h-fit w-full overflow-hidden rounded-[10px]">
					<Image className="absolute left-0 top-0 z-0 h-full w-full " src={mainSectionPattern} alt="main background" fill tabIndex={-1} />
					<div className=" flex flex-col gap-5 px-6 py-5">
						<div className="z-10 flex flex-col gap-3 text-white">
							<h3 className="text-base font-semibold">Card to FlatShare</h3>
							<p className="text-xs">{props.subTitle}</p>
						</div>
						<Button type="button" buttonType="secondary" color="white" size="sm" onClick={props.toggle} borderSmall>
							<span className="text-sm leading-none">{props.ctaText}</span>
						</Button>
					</div>
					<div className="absolute right-6 top-5 z-10 cursor-pointer text-white" onClick={props.toggle}>
						<Cancel />
					</div>
				</div>
			</div>
		</>
	);
}

export default WelcomeCard;
